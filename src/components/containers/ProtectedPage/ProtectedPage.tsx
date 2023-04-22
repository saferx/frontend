import Login from "@/components/login/Login"
import useUserRegistry from "@/hooks/useUserRegistry"
import MainContainer from "../MainContainer/MainContainer"
import { PropsWithChildren } from "react"

export default function ProtectedPage(props: PropsWithChildren) {
	const { isConnected, role } = useUserRegistry()
	if (typeof isConnected === 'undefined' && typeof role === 'undefined') return <></>
	if (isConnected && typeof role === 'undefined') return <></>
	if (isConnected === false || role === null) return <Login/>
	return (
		<MainContainer>{props.children}</MainContainer>
	)
}
