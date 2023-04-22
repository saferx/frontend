import { useState } from "react"
import OnboardRoleInputItem from "./OnboardRoleInputItem"
import { rolesAndIcons } from "@/constants/rolesAndIcons"
import { pageText } from "@/constants/pageText"
import useUserRegistry from "@/hooks/useUserRegistry"

export default function OnboardRoleInput(props: ({ name: string })) {
	const [role, setRole] = useState<Optional<UserRole>>(null)
	const { initUser } = useUserRegistry()
	const submit = () => {
		if (!(props.name && role)) return
		initUser(props.name, role)
	}
	return (
		<>
		<div className="w-full">{pageText.onboard.rolePrompt}</div>
		<div className="grid grid-cols-3 gap-4 mt-2">
			{rolesAndIcons.map((r, i) => (
				<OnboardRoleInputItem key={r.label} {...r} onClick={() => setRole(role === r.label ? null : r.label)} isSelected={role === r.label}/>
			))}
		</div>
		<div className="w-full flex justify-end">
			<button 
				onClick={submit} 
				disabled={role === null}
				className="button-accent with-transition px-6 py-2 rounded text-sm"
			>
				Submit
			</button>
		</div>
		</>
	)
}
