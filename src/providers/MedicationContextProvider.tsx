import { Wallet } from "0xsequence";
import { StateSetter } from "@/types/StateSetter";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserRegistryContext } from "./UserRegistryContextProvider";
import { SequenceIndexerClient } from "0xsequence/dist/declarations/src/indexer";
import { contractDetails } from "@/constants/contractDetails";
import { parseTokenData } from "@/utils/parseTokenData";
import { makePrescriptionList } from "@/utils/makePrescriptionList";

interface MedicationContextObject {
	wallet: Lazy<Wallet>
	prescriptions: Lazy<Prescription[]>
	setPrescriptions: StateSetter<Lazy<Prescription[]>>
}

export const MedicationContext = createContext<MedicationContextObject>({
	wallet: undefined,
	prescriptions: undefined,
	setPrescriptions: x => x,
})

export default function MedicationContextProvider(props: PropsWithChildren) {
	const [prescriptions, setPrescriptions] = useState<Lazy<Prescription[]>>(undefined)
	const { wallet, role, walletAddress } = useContext(UserRegistryContext)

	useEffect(() => {
		if (!walletAddress || role !== 'Patient') return
		(async () => {
			const indexer = new SequenceIndexerClient(contractDetails.indexer)
			const indexerResult = await indexer.getTokenBalances({
				contractAddress: contractDetails.medicationAddress,
				accountAddress: walletAddress,
				includeMetadata: true
			})
			const tokens = indexerResult.balances.map(parseTokenData)
			const prescriptions = makePrescriptionList(tokens)
			setPrescriptions(prescriptions)
		})()
	}, [role, walletAddress])

	const value = useMemo(() => ({
		wallet, prescriptions, setPrescriptions
	}), [prescriptions, wallet])

	return (
		<MedicationContext.Provider value={value}>
			{props.children}
		</MedicationContext.Provider>
	)
}
