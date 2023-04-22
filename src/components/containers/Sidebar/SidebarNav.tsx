import SidebarNavItem from "./SidebarNavItem";
import { NavLink } from "@/types/NavLink";
 
interface SidebarNavProps {
	links: NavLink[]
}

export default function SidebarNav(props: SidebarNavProps) {
	return (
		<div className="flex flex-col gap-0 w-full">
			<div className="opacity-30 hover:opacity-70 hidden"/>
			{props.links.map(pl => (
				<SidebarNavItem key={pl.path} {...pl}/>
			))}
		</div>
	)
}