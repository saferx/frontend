import useUserRegistry from "@/hooks/useUserRegistry";
import { useEffect, useState } from "react";
import HistoryTable from "../common/history-table/HistoryTable";

export default function UserHistory() {
	const {role, getHistory} = useUserRegistry()
	const [history, setHistory] = useState<{
		quantity: number;
		patient: string;
		pharmacist: string;
		tokenId: number;
		timestamp: number;
	}[] | null | undefined>(undefined)
	
	useEffect(() => {
		getHistory().then(h => setHistory(h)).catch(_ => setHistory(null))
	}, [])

	return (
		<div className="flex flex-col space-y-4">
			<div className="text-3xl font-medium">{role === 'Patient' ? 'Your Redemptions' : 'Received Redemptions'}</div>
			<HistoryTable history={history}/>
		</div>
	)
}
