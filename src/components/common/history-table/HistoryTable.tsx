
import useUserRegistry from "@/hooks/useUserRegistry";
import { relativeToNow } from "@/utils/parseDate";
import React, { useState } from "react";
import HistoryItemOverlay from "./HistoryItemOverlay";

interface HistoryComponentProps {
	history?: {
		name?: string;
		dosage?: number;
		timestamp: number;
		remarks?: string;
		pid?: string;
		tokenId: number;
		patient: string;
		pharmacist: string;
		quantity: number;
	}[] | null
}

export default function HistoryTable(props: HistoryComponentProps) {
	const { role } = useUserRegistry()
	const [selectedHistory, setSelectedHistory] = useState<({
		name?: string;
		dosage?: number;
		timestamp: number;
		remarks?: string;
		pid?: string;
		tokenId: number;
		patient: string;
		pharmacist: string;
		quantity: number;
	}) | null>(null)
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
		<div className="w-full overflow-scroll hide-scrollbar">
		<table className="table-auto w-full min-w-max">
			<thead className="text-sm text-left uppercase opacity-40">
				<th className="py-4 px-3">Time</th>
				<th className="py-4 px-3">Medicine</th>
				<th className="py-4 px-3">Quantity</th>
				{ role === 'Pharmacist' && <th className="py-4 px-3">From Patient</th>}
				{ role !== 'Pharmacist' && <th className="py-4 px-3">To Pharmacist</th>}
			</thead>
			<tbody>
				{props.history.map((historyItem, idx) => (
				<tr key={idx} className="with-bg-2 with-hover" onClick={() => setSelectedHistory(historyItem)}>
					<td className="py-4 px-3 rounded-l-lg">{relativeToNow(historyItem.timestamp)}</td>
					<td className="py-4 px-3">{historyItem.name}</td>
					<td className="py-4 px-3">{historyItem.quantity}</td>
					{role === 'Pharmacist' && <td className="py-4 px-3 rounded-r-lg">{historyItem.patient.slice(0,20)}...</td>}
					{role !== 'Pharmacist' && <td className="py-4 px-3 rounded-r-lg">{historyItem.pharmacist.slice(0,20)}...</td>}
				</tr>
				))}
			</tbody>
		</table>
		{selectedHistory && <HistoryItemOverlay close={() => setSelectedHistory(null)} historyItem={selectedHistory}/>}
		</div>
	);
}
