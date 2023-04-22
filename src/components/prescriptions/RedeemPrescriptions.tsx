
import useMedications from "@/hooks/useMedications";
import { ISOFromSeconds } from "@/utils/parseDate";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";


interface RedeemPrescriptionsProps {
	selected: Prescription;
	setSelected: (p: Prescription | null) => void;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	redeemAmounts: number[] | null;
	setRedeemAmounts: Dispatch<SetStateAction<number[] | null>>;
}

export default function RedeemPrescriptions(props: RedeemPrescriptionsProps) {
	const {
		selected,
		setSelected,
		loading,
		setLoading,
		redeemAmounts,
		setRedeemAmounts,
	} = props;

	const [pharmacistAddressInput, setPharmacistAddressInput] =
		useState<string>("");

	const { redeem, getBalanceFor, prescriptions, setPrescriptions } = useMedications();

	const initiateRedeemSelection = () => {
		if (!selected) return;
		setRedeemAmounts(selected.medications.map((m) => m.quantity || 0));
	};

	const initiateRedeemTransaction = () => {
		if (!redeemAmounts || !selected) {
			return;
		}
		const tokensAndAmounts = redeemAmounts.map((amount, i) => ({
			amount,
			tokenId: selected.medications[i].tokenId,
		}));
		redeem(pharmacistAddressInput, tokensAndAmounts).then((_) => {
			setPharmacistAddressInput("");
			setSelected({
				...selected,
				medications: selected.medications.map((medication) => ({
					...medication,
				})),
			});
		});
	};
	useEffect(() => {
		if (!selected) {
			return;
		}
		setLoading(true);
		setRedeemAmounts(null);
		let changed = false;
		const updateSelectedPrescriptions = async () => {
			const meds = await Promise.allSettled(
				selected.medications.map(async (m) => {
					if (typeof m.quantity !== 'undefined') return m;
					changed = true;
					const quantity = await getBalanceFor(m.tokenId);
					return { ...m, quantity };
				})
			).then((results) =>
				results
					.map((r) => (r.status === "rejected" ? null : r.value))
					.filter((r) => r !== null)
			);
			setLoading(false);
			if (!changed) {
				return;
			}
			setSelected({ ...selected, medications: meds as Medication[] });
			setPrescriptions(
				prescriptions?.map((p) =>
					p._id === selected._id
						? { ...selected, medications: meds as Medication[] }
						: p
				)
			);
		};
		updateSelectedPrescriptions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);
	return (
		<div className="fixed p-6 md:p-12 z-40 left-0 w-full md:max-w-lg md:right-0 md:left-auto md:bottom-0">
			<div className="px-6 py-9 with-bg-1 rounded-lg with-ring shadow-xl">
				<div className="flex justify-between items-center">
					<div className="font-semibold text-lg">Your Prescription</div>
					<button
						className="opacity-50 hover:opacity-80 with-transition"
						onClick={() => setSelected(null)}
					>
						<IconX className="opacity-50" />
					</button>
				</div>
				<div className="flex flex-col gap-1 mt-8">
					<div className="flex justify-between items-center">
						<span className="font-medium">ID: </span>
						{selected._id}
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium">Date: </span>
						{ISOFromSeconds(selected.timestamp)}
					</div>
				</div>
				<div className="mt-8 flex flex-col gap-1">
					{redeemAmounts && (
						<div className="font-medium">Select Medications</div>
					)}
					{!loading &&
						selected.medications.map((m, i) => (
							<div
								key={`${m.pid}_${i}`}
								className="-mx-6 px-6 py-3 with-bg-1 with-hover with-transition"
							>
								<div className="flex justify-between items-center">
									<div className="flex flex-col">
										<div className="">
											{i + 1}. {m.name} ({m.dosage}mg){" "}
											<span className="opacity-40">x{m.quantity}</span>
										</div>
										<div className="opacity-40 text-sm">
											Remarks: {m.remarks}
										</div>
									</div>
									{redeemAmounts !== null && (
										<div className="flex gap-2">
											<button
												onClick={() =>
													setRedeemAmounts(
														(ra) =>
															ra?.map((a, j) =>
																i == j ? Math.max(a - 1, 0) : a
															) || null
													)
												}
												className="opacity-50 hover:opacity-100 with-transition"
											>
												<IconMinus size={14} />
											</button>
											<input
												onChange={(e) =>
													setRedeemAmounts(
														(ra) =>
															ra?.map((a, j) =>
																i == j ? parseInt(e.target.value || "0") : a
															) || null
													)
												}
												className="px-2 py-1 with-ring rounded-md w-12 with-bg-2"
												value={redeemAmounts[i]}
											/>
											<button
												onClick={() =>
													setRedeemAmounts(
														(ra) =>
															ra?.map((a, j) =>
																i == j ? Math.min(a + 1, m.quantity || 0) : a
															) || null
													)
												}
												className="opacity-50 hover:opacity-100 with-transition"
											>
												<IconPlus size={14} />
											</button>
										</div>
									)}
								</div>
							</div>
						))}
				</div>
				{redeemAmounts && (
					<div className="mt-8 flex flex-col gap-3">
						<div className="font-medium">Pharmacist Wallet Address</div>
						<input
							value={pharmacistAddressInput}
							onChange={(e) => setPharmacistAddressInput(e.currentTarget.value)}
							placeholder="0x.............................."
							className="with-bg-1 rounded-md w-full px-4 py-2 with-ring with-bg-2"
						/>
					</div>
				)}
				<div className="flex justify-between items-center w-full mt-8">
					{redeemAmounts == null ? (
						<>
							<div />
							<button
								onClick={initiateRedeemSelection}
								className="bg-violet-500 hover:bg-violet-600 with-transition px-3 py-2 text-slate-100 rounded-md text-sm disabled:opacity-40"
							>
								Redeem
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => setRedeemAmounts(null)}
								className="with-bg-2 with-hover with-transition px-3 py-2 rounded-md text-sm"
							>
								Cancel
							</button>
							<button
								onClick={initiateRedeemTransaction}
								disabled={
									!redeemAmounts.filter((a) => a > 0).length ||
									!pharmacistAddressInput.trim().length
								}
								className="bg-violet-500 hover:bg-violet-600 with-transition px-3 py-2 text-slate-100 rounded-md text-sm disabled:opacity-40"
							>
								Sign
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
