import { Wallet, sequence } from "0xsequence";
import { contractDetails } from "@/constants/contractDetails";
import { StateSetter } from "@/types/StateSetter";
import { UserServerResponse } from "@/types/UserServerResponse";
import parseRole from "@/utils/parseRole";
import { getUserUtil } from "@/utils/userRegistryUtils";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";

interface UserRegistryContextObject {
	wallet: Lazy<Wallet>
	isConnected: Lazy<boolean>
	setIsConnected: StateSetter<Lazy<boolean>>
	walletAddress: LazyOptional<string>
	setWalletAddress: StateSetter<LazyOptional<string>>
	name: LazyOptional<string>
	setName: StateSetter<LazyOptional<string>>
	role: LazyOptional<UserRole>
	setRole: StateSetter<LazyOptional<UserRole>>
}

export const UserRegistryContext = createContext<UserRegistryContextObject>({
	wallet: undefined,
	isConnected: false,
	setIsConnected: x => x,
	walletAddress: undefined,
	setWalletAddress: x => x,
	name: undefined,
	setName: x => x,
	role: undefined,
	setRole: x => x
})

export default function UserRegistryContextProvider(props: PropsWithChildren) {
	const [wallet, setWallet] = useState<Lazy<Wallet>>(undefined)
	const [isConnected, setIsConnected] = useState<Lazy<boolean>>(undefined)
	const [walletAddress, setWalletAddress] = useState<LazyOptional<string>>(undefined)
	const [name, setName] = useState<LazyOptional<string>>(undefined)
	const [role, setRole] = useState<LazyOptional<UserRole>>(undefined)

	useEffect(() => {
		(async () => {
			await sequence.initWallet(contractDetails.network)
			const wallet = sequence.getWallet()
			setWallet(wallet)
			setIsConnected(wallet.isConnected)
		})()
	}, [])

	useEffect(() => {
		if (!isConnected || !wallet) {
			setWalletAddress(null)
			setName(undefined)
			setRole(undefined)
			return
		}
		wallet.getAddress()
			.then((add: string) => setWalletAddress(add))
			.then((_: void) => getUserUtil(wallet))
			.then((user: UserServerResponse) => {
				const invalid = user[0] === ""
				setName(invalid ? null : user[0])
				setRole(invalid ? null : parseRole(user[1].toNumber()))
			})
			.catch((e: Error) => {
				console.error(e)
				setWalletAddress(null)
				setName(undefined)
				setRole(undefined)
			})
	}, [wallet, isConnected])

	const value = useMemo(() => ({
		wallet,
		isConnected, setIsConnected,
		walletAddress, setWalletAddress,
		name, setName,
		role, setRole
	}), [isConnected, walletAddress, name, role])

	return (
		<UserRegistryContext.Provider value={value}>
			{props.children}
		</UserRegistryContext.Provider>
	)
}
