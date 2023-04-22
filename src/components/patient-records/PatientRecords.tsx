import useUserRegistry from "@/hooks/useUserRegistry";
import { IconQrcode } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import HistoryTable from "../common/history-table/HistoryTable";
import ScanQRCodeOverlay from "../common/qr/ScanQROverlay";

export default function PatientRecords() {
	const { getHistory } = useUserRegistry()
	const [patientAddressInput, setPatientAddressInput] = useState('')
	const [isQrScanShown, setIsQrScanShown] = useState<boolean>(false)
	const [history, setHistory] = useState<{
		quantity: number;
		patient: string;
		pharmacist: string;
		tokenId: number;
		timestamp: number;
	}[] | null | undefined>(undefined)

	const onClick = () => {
		getHistory(patientAddressInput)
			.then(h => setHistory(h))
			.catch(e => setHistory(null))
	}

	useEffect(() => { console.log(history)}, [history])

	return (
		<div className="flex flex-col gap-6">
			<div className="text-3xl font-medium">Search Patient Records</div>
			<div className="flex flex-col gap-3">
				<div className="flex justify-between items-center max-w-md">
					<div className="text-lg opacity-50">Enter Patient Address</div>
					<button onClick={() => setIsQrScanShown(true)} className="hover:opacity-70 opacity-30 with-transition">
						<IconQrcode/>
					</button>
				</div>
				<div className="flex gap-4 w-full max-w-md">
					<input
						onChange={e => setPatientAddressInput(e.currentTarget.value)}
						value={patientAddressInput}
						placeholder="0x................"
						className="px-3 py-2 rounded-md with-ring w-full with-bg-2"
					/>
					<button
						onClick={onClick}
						disabled={!patientAddressInput.length}
						className="disabled:opacity-40 bg-violet-500 hover:bg-violet-600 with-transition text-white px-3 py-2 rounded-md"
					>Search</button>
				</div>
			</div>
			<div className="overflow-x">
				<HistoryTable history={history}/>
			</div>
			<ScanQRCodeOverlay
				isOpen={isQrScanShown}
				address={patientAddressInput}
				setAddressInput={setPatientAddressInput}
				close={() => setIsQrScanShown(false)}/>
		</div>
	)
}
