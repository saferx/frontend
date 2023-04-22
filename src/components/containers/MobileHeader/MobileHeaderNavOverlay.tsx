import { IconLogout, IconX } from "@tabler/icons-react";
import MobileHeaderNavOverlayItem from "./MobileHeaderNavOverlayItem";
import { NavLink } from "@/types/NavLink";
import useUserRegistry from "@/hooks/useUserRegistry";


interface MobileHeaderNavOverlayProps {
	isOpen: boolean
	close: () => void
	links: NavLink[]
}

export default function MobileHeaderNavOverlay(props: MobileHeaderNavOverlayProps) {
	const { name, role, disconnect } = useUserRegistry()
	return (
		<div className="fixed top-0 left-0 w-full h-screen bg-black/80 z-50 py-12 px-6 flex flex-col gap-4 justify-center items-start">
			<div className="w-full with-bg-1 py-8 rounded-lg  max-w-md flex flex-col gap-8">
				<div className="flex justify-between items-center px-8">
					<div className="text-lg">Navigation</div>
					<button className="opacity-50 hover:opacity-100 with-transition" onClick={props.close}>
						<IconX/>
					</button>
				</div>
				<div className="flex flex-col">
					{props.links.map(pl => <MobileHeaderNavOverlayItem key={pl.path} {...pl}/>)}
				</div>
			</div>
			<div className="flex w-full max-w-md justify-start items-center py-8 px-5 gap-4 rounded-lg with-bg-1">
				<div className="flex flex-col flex-1">
					<div>{name}</div>
					<div className="text-sm opacity-50">{role}</div>
				</div>
				<button onClick={disconnect} className="hover:opacity-70 opacity-30 with-transition">
					<IconLogout size={24}/>
				</button>
			</div>
		</div>
	)
}
