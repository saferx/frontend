import { pageText } from "@/constants/pageText";

export default function SequenceLearnMore() {
	return (
		<div className="flex flex-col gap-2 text-center">
			<div className="opacity-50">{pageText.login.sequenceWhy}</div>
			<button className="text-accent with-hover with-transition">{pageText.login.learnMore}</button>
		</div>
	)
}
