import QRCode from "react-qr-code"
import { toPng } from 'html-to-image';
import { useCallback, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import useUserRegistry from "@/hooks/useUserRegistry";

interface ViewQROverlayProps {
	close: () => void
}

export default function ViewQROverlay(props: ViewQROverlayProps) {
	const { walletAddress, role } = useUserRegistry()
	const qrRef = useRef<HTMLDivElement>(null)
	const download = useCallback(() => {
		if (!qrRef.current) return
		toPng(qrRef.current)
			.then(dataUrl => {
				const link = document.createElement('a');
				link.download = 'qr-code.png';
				link.href = dataUrl;
				link.click();
			})
			.catch(e => console.error(e));
	}, [qrRef])
	if (!walletAddress) return <></>
	if (role === 'Doctor') return <></>
	return (
		<div className="fixed top-0 left-0 p-4 w-screen h-screen bg-black/80 dark:bg-slate-700/50 z-50 flex items-center justify-center">
			<div className="w-full max-w-md with-bg-1 px-8 py-12 rounded-lg flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<div className="text-lg font-medium">Your QR Code</div>
					<button onClick={props.close}><IconX/></button>
				</div>
				<div className="opacity-50 text-sm">Display this QR code to your {role === 'Patient' ? 'doctor' : 'pharmacist'} to allow them to input your address easily. You can also download and send it to them if they are using a non-mobile platform.</div>
				<div ref={qrRef} className="w-full flex items-center justify-center p-4">
					<QRCode value={walletAddress} className="dark:invert" id="qr-code-image"/>
				</div>
				<button onClick={download} className="rounded-lg px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white mt-4">
					Download
				</button>
			</div>
		</div>
	)
}
