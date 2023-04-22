import { pageText } from "@/constants/pageText";
import Logo from "../common/logo/Logo";

export default function LoginLeft() {
	return (
		<div className="p-16 w-full h-full hidden lg:flex flex-col gap-2 justify-center with-bg-1">
			<Logo size={'4em'} className="w-full"/>
			<div className="text-2xl opacity-50 max-w-md">{pageText.login.tagline}</div>
		</div>
	)
}
