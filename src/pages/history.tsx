import ProtectedPage from "@/components/containers/ProtectedPage/ProtectedPage";
import UserHistory from "@/components/history/UserHistory";
import useUserRegistry from "@/hooks/useUserRegistry";
import { useRouter } from "next/router";

export default function History() {
	const { role } = useUserRegistry()
	const router = useRouter()
	if (role === 'Doctor') router.push('/')
	return (
		<ProtectedPage>
			<UserHistory/>
		</ProtectedPage>
	)
}
