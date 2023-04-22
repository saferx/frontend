import { useState } from "react";
import MobileHeaderNavOverlay from "./MobileHeaderNavOverlay";
import getNavLinks from "@/utils/getNavLinks";
import useUserRegistry from "@/hooks/useUserRegistry";
import { IconMenu2, IconQrcode } from "@tabler/icons-react";
import ViewQROverlay from "@/components/common/qr/ViewQROverlay";

export default function MobileHeader() {
	const {role} = useUserRegistry()
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
	const [isQrShown, setIsQrShown] = useState<boolean>(false)
	const open = () => setIsNavOpen(true)
	const close = () => setIsNavOpen(false)
	return (
		<div className="md:hidden">
			<header className="fixed w-full p-8 backdrop-blur-2xl flex items-center justify-between z-10 shadow-lg">
				<div className="text-3xl">safe<span className="text-violet-500">Rx</span></div>
				<div className="flex gap-4">
					{ role !== 'Doctor' && (
						<button onClick={() => setIsQrShown(true)} className="hover:opacity-70 opacity-30 with-transition">
							<IconQrcode/>
						</button>
					)}
					<button className="opacity-50 hover:opacity-100 with-transition">
						<IconMenu2 onClick={open}/>
					</button>
				</div>
			</header>
			{isNavOpen && <MobileHeaderNavOverlay links={getNavLinks(role)} close={close} isOpen={isNavOpen}/>}
			{isQrShown && <ViewQROverlay close={() => setIsQrShown(false)}/>}
		</div>
	)
}
