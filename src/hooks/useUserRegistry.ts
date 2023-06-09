import { SequenceMetadataClient } from "@0xsequence/metadata"
import { contractDetails } from "@/constants/contractDetails"
import { UserRegistryContext } from "@/providers/UserRegistryContextProvider"
import { HistoryServerResponse } from "@/types/HistoryServerResponse"
import { connectUtil, disconnectUtil } from "@/utils/connectionUtils"
import { parseTokenMetadata } from "@/utils/parseTokenData"
import { deleteUserUtil, getHistoryUtil, initUserUtil } from "@/utils/userRegistryUtils"
import { useContext } from "react"

export default function useUserRegistry() {
	const {
		wallet,
		isConnected, setIsConnected,
		walletAddress,
		name, setName,
		role, setRole
	} = useContext(UserRegistryContext)

	const connect = () => {
		if (!wallet || isConnected) return
		connectUtil(wallet)
			.then(_ => setIsConnected(true))
			.catch(e => console.error(e))
	}

	const disconnect = () => {
		if (!wallet) return
		disconnectUtil(wallet).then(_ => {
			setIsConnected(false)
			setName(undefined)
			setRole(undefined)
		})
	}

	const initUser = (name: string, role: UserRole) => {
		if (!wallet) return
		initUserUtil(wallet, name, role)
			.then(_ => {
				setName(name)
				setRole(role)
			})
			.catch(e => console.error(e))
	}

	const deleteUser = () => {
		if (!wallet) return
		deleteUserUtil(wallet)
			.then(_ => disconnect())
			.catch(e => console.error(e))
	}

	const getHistory = (address?: string) => {
		if (!wallet) return (async () => null)()
		const metadataClient = new SequenceMetadataClient()
		return (address ? getHistoryUtil(wallet, address) : getHistoryUtil(wallet))
			.then(objs =>  objs.map((o: HistoryServerResponse): RxHistory => {
				const [tokenId, quantity, timestamp, patient, pharmacist] = o
				return { quantity, patient, pharmacist, tokenId: tokenId.toNumber(), timestamp: timestamp.toNumber()}
			}))
			.then((objs: RxHistory[]) => {
				console.log(objs)
				const allIds = objs.map((o: RxHistory) => o.tokenId.toString())
				const uniqueIds = Array.from(new Set(allIds))
				return metadataClient.getTokenMetadata({ 
					chainID: contractDetails.network, contractAddress: contractDetails.medicationAddress, tokenIDs: uniqueIds})
					.then(res => res.tokenMetadata)
					.then(res => {
						if (res) return res.map(r => parseTokenMetadata(r))
						return uniqueIds.map(i => ({}))
					})
					.then(res => uniqueIds.reduce((o, k, i) => o.set(k, res[i]), new Map<string, MedicationMetadata>()))
					.then(res => {
						return objs.map(o => ({...(res.get(o.tokenId.toString())), ...o,}))
					})
					.then(res => res.sort(t => t.timestamp).reverse())
			})
			.catch(e => {
				console.log(e)
				return null
			})
	}

	return {
		isConnected,
		walletAddress,
		name, role,
		connect, disconnect,
		initUser,
		deleteUser,
		getHistory
	}
}
