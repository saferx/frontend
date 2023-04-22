
import useUserRegistry from "@/hooks/useUserRegistry";
import { formattedFromSeconds } from "@/utils/parseDate";
import React from "react";

interface HistoryComponentProps {
	history?: {
		quantity: number;
		patient: string;
		pharmacist: string;
		tokenId: number;
		timestamp: number;
	}[] | null
}

export default function HistoryTable(props: HistoryComponentProps) {
	const { role } = useUserRegistry()
	if (props.history === undefined) return <></>
	if (props.history == null) return (
		<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-lg" role="alert">
			<span className="block sm:inline">Error retrieving history</span>
		</div>
	)
	if (props.history.length == 0) return (
		<div className="bg-violet-100 border border-violet-400 text-violet-700 px-4 py-3 rounded relative max-w-lg" role="alert">
			<span className="block sm:inline">No history found for this address.</span>
		</div>
	)
	return (
		<table className="table-auto overflow-scroll w-full">
			<thead className="text-sm text-left uppercase opacity-40">
				<th className="py-3">Time</th>
				<th className="py-3">Token ID</th>
				{ role !== 'Patient' && <th className="py-3">From Patient</th>}
				{ role !== 'Pharmacist' && <th className="py-3">To Pharmacist</th>}
				<th className="py-3">Quantity</th>
			</thead>
			<tbody>
				{props.history.map((historyItem, idx) => (
				<tr key={idx}>
					<td className="py-2">{formattedFromSeconds(historyItem.timestamp)}</td>
					<td className="py-2">{historyItem.tokenId}</td>
					{role !== 'Patient' && <td className="py-2">{historyItem.patient.slice(0,10)}...</td>}
					{role !== 'Pharmacist' && <td className="py-2">{historyItem.pharmacist.slice(0,10)}...</td>}
					<td className="py-2">{historyItem.quantity}</td>
				</tr>
				))}
			</tbody>
		</table>
	);
}
