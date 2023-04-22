import { pageText } from "@/constants/pageText"
import { StateSetter } from "@/types/StateSetter"
import { ChangeEvent, useState } from "react"

export default function OnboardNameInput(props: ({ setName: StateSetter<Optional<string>>})) {
	const [nameInput, setNameInput] = useState('')
	const updateNameInput = (e: ChangeEvent<HTMLInputElement>) => setNameInput(e.currentTarget.value)
	return (
		<>
		<div className="w-full text-lg">{pageText.onboard.namePrompt}</div>
		<input value={nameInput} onChange={updateNameInput} className="px-3 py-2 w-full with-bg-2 rounded"/>
		<div className="w-full flex justify-end">
			<button 
				onClick={() => props.setName(nameInput)} 
				disabled={!nameInput.length} 
				className="button-accent with-transition"
			>
				Next
			</button>
		</div>
		</>
	)
}
