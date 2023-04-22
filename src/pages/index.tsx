import ProtectedPage from "@/components/containers/ProtectedPage/ProtectedPage";
import MintNewPrescription from "@/components/mint/MintNewPrescription";
import RecentPrescriptions from "@/components/prescriptions/RecentPrescriptions";
import useUserRegistry from "@/hooks/useUserRegistry";
import { useRouter } from "next/router";

export default function Home() {
	const { role } = useUserRegistry()
	const router = useRouter()
	if (role === 'Pharmacist') router.push('/history')
	return (
		<ProtectedPage>
			{ role === 'Patient' ? <RecentPrescriptions/> : <MintNewPrescription/> }
		</ProtectedPage>
	)
}
