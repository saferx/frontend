import useUserRegistry from "@/hooks/useUserRegistry";
import { useState } from "react";
import { IconLogout, IconQrcode, IconTrash } from "@tabler/icons-react";
import ViewQROverlay from "@/components/common/qr/ViewQROverlay";


export default function SidebarProfile() {
	const { name, role, disconnect } = useUserRegistry()
	const [isQrShown, setIsQrShown] = useState(false)
	return (
		<div className="flex w-full justify-start items-center py-8 px-5 gap-4 border-t-2 border-t-slate-500/5">
			<div className="flex flex-col flex-1">
				<div>{name}</div>
				<div className="text-sm opacity-50">{role}</div>
			</div>
			{ role !== 'Doctor' && (
				<button onClick={() => setIsQrShown(true)} className="hover:opacity-70 opacity-30 with-transition">
					<IconQrcode size={24}/>
				</button>
			)}
			{isQrShown && <ViewQROverlay close={() => setIsQrShown(false)}/>}
			<button onClick={disconnect} className="hover:opacity-70 opacity-30 with-transition">
				<IconLogout size={24}/>
			</button>
		</div>
	)
}
