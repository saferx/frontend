import useUserRegistry from "@/hooks/useUserRegistry"

export default function ConnectButton() {
	const { connect } = useUserRegistry()
	return (
		<div className="flex items-center justify-center">
			<button onClick={connect} className="button-accent with-transition rounded-md">
				Login with <span className="font-bold">Sequence</span>
			</button>
		</div>
	)
}