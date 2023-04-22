import { pageText } from "@/constants/pageText";
import Logo from "../common/logo/Logo";

export default function LoginLeft() {
	return (
		<div className="p-16 w-full h-full hidden lg:flex flex-col gap-2 justify-center items-center with-bg-1">
			<div className="flex flex-col gap-2 max-w-md justify-center items-center">
				<Logo size={'4em'} className="w-full"/>
				<div className="text-2xl opacity-50">{pageText.login.tagline}</div>
			</div>
		</div>
	)
}
