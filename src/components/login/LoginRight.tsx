import useUserRegistry from "@/hooks/useUserRegistry"
import Logo from "../common/logo/Logo"
import OnboardView from "./onboard/OnboardView"
import ConnectView from "./connect/ConnectView"
import { pageText } from "@/constants/pageText"

export default function LoginRight() {
	const { walletAddress } = useUserRegistry()
	return (
		<div className="p-6 w-full h-full flex flex-col gap-8 justify-center items-center with-bg-2">
			<div className="lg:hidden flex flex-col items-center justify-center w-full max-w-md gap-4">
				<Logo size={'3em'}/>
				<div className="text-xl opacity-50 text-center">{pageText.login.tagline}</div>
			</div>
			<div className="w-full p-12 flex items-center justify-center max-w-md rounded with-bg-1">
				{!!walletAddress ? <OnboardView/> : <ConnectView/>}
			</div>
		</div>
	)
}
