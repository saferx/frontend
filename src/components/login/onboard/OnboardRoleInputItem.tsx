import { Icon } from "@tabler/icons-react"

export default function OnboardRoleInputItem(props: ({ onClick: () => void, isSelected: boolean, icon: Icon, label: string })) {
	return (
		<div className="group w-full aspect-square flex flex-col gap-2 items-center">
			<div className="ring-violet-500 ring-4 mt-2 -mb-2 hover:my-0 hidden"/>
			<button
				onClick={props.onClick} 
				className={`rounded-xl with-bg-2 w-full aspect-square justify-center items-center flex${props.isSelected ? ' ring-violet-500 ring-4' : ''}`}>
				<props.icon size={28} className="opacity-50"/>
			</button>
			<div className={`text-sm with-transition group-hover:my-0 group-hover:opacity-50${props.isSelected ? ' opacity-50' : ' opacity-0 mt-2 -mb-2'}`}>{props.label}</div>
		</div>
	)
}
