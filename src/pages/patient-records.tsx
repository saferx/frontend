import ProtectedPage from "@/components/containers/ProtectedPage/ProtectedPage";
import PatientRecords from "@/components/patient-records/PatientRecords";
import useUserRegistry from "@/hooks/useUserRegistry";
import { useRouter } from "next/router";

export default function History() {
	const { role } = useUserRegistry()
	const router = useRouter()
	if (role === 'Patient') router.push('/')
	return (
		<ProtectedPage>
			<PatientRecords/>
		</ProtectedPage>
	)
}
