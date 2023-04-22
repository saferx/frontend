import ConnectButton from "./ConnectButton";
import SequenceLearnMore from "./SequenceLearnMore";

export default function ConnectView() {
	return (
		<div className="flex flex-col gap-8 max-w-xs">
			<ConnectButton/>
			<SequenceLearnMore/>
		</div>
	)
}
