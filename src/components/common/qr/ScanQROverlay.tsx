import { IconX } from "@tabler/icons-react"
import { Dispatch, SetStateAction } from "react"
import QrReader from "react-qr-reader"


interface ScanQRCodeOverlayProps {
	isOpen: boolean
	address: string
	setAddressInput: Dispatch<SetStateAction<string>>
	close: () => void
}

export default function ScanQRCodeOverlay(props: ScanQRCodeOverlayProps) {
	if (!props.isOpen) return <></>
	try {
		return (
			<div  className="fixed top-0 left-0 p-4 w-screen h-screen bg-black/80 dark:bg-slate-700/50 z-50 flex items-center justify-center">
				<div className="w-full max-w-md with-bg-1 px-8 py-12 rounded-lg flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<div className="text-lg font-medium">Scan Wallet Address</div>
						<button onClick={props.close}><IconX/></button>
					</div>
					<QrReader key={props.address} onScan={(res) => {
						if (!!res) {
							props.setAddressInput(res)
							props.close()
						}
					}} onError={e => console.error(e)} facingMode="environment" />
				</div>
			</div>
		)
	} catch (error) {
		console.error(error)
		return <></>
	}	
}
