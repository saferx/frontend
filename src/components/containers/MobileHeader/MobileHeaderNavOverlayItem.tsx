import { Icon } from "@tabler/icons-react";
import Link from "next/link";

interface MobileHeaderNavOverlayItemProps {
	name: string
    icon: Icon
    path: string
}

export default function MobileHeaderNavOverlayItem(props: MobileHeaderNavOverlayItemProps) {
	return (
		<Link href={props.path} className="py-3 px-8 with-bg-1 with-hover with-transition flex gap-2 opacity-70">
			<props.icon/>
			<div>{props.name}</div>
		</Link>
	)
}