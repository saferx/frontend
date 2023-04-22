import { useState } from "react";
import RecentPrescriptionsGrid from "./RecentPrescriptionsGrid";
import RedeemPrescriptions from "./RedeemPrescriptions";

export default function RecentPrescriptions() {
	const [selected, setSelected] = useState<Prescription | null>(null);
	const [loading, setLoading] = useState(true);
	const [redeemAmounts, setRedeemAmounts] = useState<number[] | null>(null);
	return (
		<div className="flex flex-col max-w-full">
			<RecentPrescriptionsGrid setSelected={setSelected} />
			{selected && (
				<RedeemPrescriptions
					selected={selected}
					setSelected={setSelected}
					loading={loading}
					setLoading={setLoading}
					redeemAmounts={redeemAmounts}
					setRedeemAmounts={setRedeemAmounts}
				/>
			)}
		</div>
	);
}
