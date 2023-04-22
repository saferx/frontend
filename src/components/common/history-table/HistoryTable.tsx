
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
		<>
		<table className="table-auto overflow-scroll w-full">
			<thead className="text-sm text-left uppercase opacity-40">
				<th className="py-3">Time</th>
				<th className="py-3">Medicine</th>
				<th className="py-3">Quantity</th>
				{ role === 'Pharmacist' && <th className="py-3">From Patient</th>}
				{ role !== 'Pharmacist' && <th className="py-3">To Pharmacist</th>}
			</thead>
			<tbody>
				{props.history.sort(h => h.timestamp).reverse().map((historyItem, idx) => (
				<tr key={idx} className="with-bg-1 with-hover" onClick={() => setSelectedHistory(historyItem)}>
					<td className="p-2">{relativeToNow(historyItem.timestamp)}</td>
					<td className="p-2">{historyItem.name}</td>
					<td className="p-2">{historyItem.quantity}</td>
					{role === 'Pharmacist' && <td className="p-2">{historyItem.patient.slice(0,10)}...</td>}
					{role !== 'Pharmacist' && <td className="p-2">{historyItem.pharmacist.slice(0,10)}...</td>}
				</tr>
				))}
			</tbody>
		</table>
		{selectedHistory && <HistoryItemOverlay close={() => setSelectedHistory(null)} historyItem={selectedHistory}/>}
		</>
	);
}
