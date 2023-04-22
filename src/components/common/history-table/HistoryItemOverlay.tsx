import { relativeToNow } from "@/utils/parseDate";
import { IconX } from "@tabler/icons-react";

interface HistoryItem {
	name?: string;
    dosage?: number;
    timestamp: number;
    remarks?: string;
    pid?: string;
    tokenId: number;
    patient: string;
    pharmacist: string;
    quantity: number;
}

export default function HistoryItemOverlay(props: ({ historyItem: HistoryItem, close: () => void})) {
	console.log(props.historyItem)
	return (
		<div className="fixed top-0 left-0 mt-0 p-4 w-screen h-screen bg-black/80 z-50 flex items-center justify-center">
			<div className="w-full max-w-md with-bg-1 px-8 py-12 rounded-lg flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<div className="text-lg font-medium">Redemption Details</div>
					<button onClick={props.close}><IconX/></button>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-1">
						<div className="text-sm">Prescription ID</div>
						<div className="opacity-50">{props.historyItem.pid}</div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="text-sm">Time</div>
						<div className="opacity-50">{relativeToNow(props.historyItem.timestamp)}</div>
					</div>
				</div>
				<div className="flex flex-col gap-1 mt-4">
					<div className="text-sm">Name</div>
					<div className="opacity-50">{props.historyItem.name}</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="text-sm">Quantity</div>
					<div className="opacity-50">{props.historyItem.quantity}</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="text-sm">Remarks</div>
					<div className="opacity-50">{props.historyItem.remarks}</div>
				</div>
				<div className="flex flex-col gap-1 mt-4">
					<div className="text-sm">Patient</div>
					<div className="opacity-50">{props.historyItem.patient.slice(0,20)}...</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="text-sm">Pharmacist</div>
					<div className="opacity-50">{props.historyItem.pharmacist.slice(0, 20)}...</div>
				</div>
			</div>
		</div>
	)
}