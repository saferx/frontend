import { MedicationContext } from "@/providers/MedicationContextProvider"
import { generatePid } from "@/utils/generatePid"
import { getBalanceForUtil, mintUtil, redeemUtil } from "@/utils/medicationUtils"
import { useContext } from "react"

export default function useMedications() {
	const { wallet, prescriptions, setPrescriptions } = useContext(MedicationContext)

	const mint = (patient: string, medicationsToMint: MintMedicationInput[]) => {
		if (!wallet) return(async () => {})()
		const pid = generatePid()
		return mintUtil(wallet, patient, pid, medicationsToMint)
	}

	const redeem = (pharmacist: string, tokenAndAmounts: RedeemTokenInput[]) => {
		if (!wallet) return(async () => {})()
		return redeemUtil(wallet, pharmacist, tokenAndAmounts)
	}

	const getBalanceFor = async (tokenId: string) => {
		if (!wallet) return
		return await getBalanceForUtil(wallet, tokenId)
	}

	return {
		prescriptions, setPrescriptions,
		mint,
		redeem,
		getBalanceFor
	}
}
