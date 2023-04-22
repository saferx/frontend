import useMedications from "@/hooks/useMedications";
import { relativeToNow } from "@/utils/parseDate";
import { IconGlass, IconPill } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface RecentPrescriptionsProps {
	setSelected: Dispatch<SetStateAction<Prescription | null>>;
}

export default function RecentPrescriptionsGrid(props: RecentPrescriptionsProps) {
	const { prescriptions } = useMedications();
	return (
		<div className="flex flex-col gap-8 items-start justify-start w-full">
			<div className="text-3xl font-medium">Your Prescriptions</div>
			{!!prescriptions && (
				<div className="flex w-full">
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 z-10 gap-4 hide-scrollbar overflow-scroll w-full max-w-full">
						{prescriptions.map((p) => (
							<div key={p._id} className="group flex flex-col">
								<button
									onClick={() => props.setSelected(p)}
									className="w-full aspect-square with-bg-2 rounded-lg flex items-center justify-center"
								>
									<div className="opacity-25 flex gap-2 items-center justify-center">
										<IconPill size={28} />
										<div className="text-lg">
											{p.medications.length > 0 &&
												"x" + p.medications.length.toString()}
										</div>
									</div>
								</button>
								<div className="opacity-50 cursor-default group-hover:opacity-100 with-transition mt-3">
									{p._id}
								</div>
								<div className="opacity-30 cursor-default group-hover:opacity-50 with-transition text-sm">
									{relativeToNow(p.timestamp)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{typeof prescriptions !== "undefined" && !prescriptions.length && (
				<div className="w-full flex items-center justify-center rounded-lg border-2 p-8 border-dashed dash border-slate-500 opacity-30">
					<div className="flex flex-col gap-2 items-center">
						<IconGlass size={48} />
						<h3 className="text-lg">No prescriptions yet...</h3>
						<p className="text-sm text-center max-w-xs">
							...and we hope you won&apos;t need one, but we&apos;re here to
							make things safer if you do!
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
