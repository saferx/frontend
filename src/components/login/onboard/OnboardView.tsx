import { useState } from "react"
import OnboardRoleInput from "./OnboardRoleInput"
import OnboardNameInput from "./OnboardNameInput"

export default function OnboardView() {
	const [name, setName] = useState<Optional<string>>(null)
	console.log(name)
	return (
		<div className="flex flex-col gap-4 w-full">
			{name ? <OnboardRoleInput name={name}/> : <OnboardNameInput setName={setName}/>}
		</div>
	) 
}
