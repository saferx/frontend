import SidebarLogo from "./SidebarLogo"
import SidebarNav from "./SidebarNav"
import SidebarProfile from "./SidebarProfile"
import getNavLinks from "@/utils/getNavLinks"
import useUserRegistry from "@/hooks/useUserRegistry"

export default function Sidebar() {
	const { role } = useUserRegistry()
	return (
		<aside className="h-full hidden md:flex with-bg-1 flex-col gap-3 border-r-2 border-r-slate-500/10 w-72 shadow-xl z-50">
			<SidebarLogo/>
			<SidebarNav links={getNavLinks(role)}/>
			<div className="flex-1 w-full"/>
			<SidebarProfile/>
		</aside>
	)
}
