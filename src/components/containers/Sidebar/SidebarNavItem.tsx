import { Icon } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"

interface SidebarNavItemProps {
	name: string
    icon: Icon
    path: string
}

export default function SidebarNavItem(props: SidebarNavItemProps) {
	const { name, path } = props
	const currPath = useRouter().pathname
	return (
		<Link href={path} className={`flex gap-4 w-full px-8 py-3 with-bg-1 ${currPath === path ? 'opacity-70 text-violet-500 text-bold' : 'opacity-30'} hover:opacity-70 with-transition items-center`}>
			<props.icon size={24}/>
			<div className="text-lg">{name}</div>
		</Link>
	)
}