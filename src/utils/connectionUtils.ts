import { Wallet } from "0xsequence"

export const connectUtil = async (wallet: Wallet) => {
	const status = await wallet.connect({ app: 'safeRx' })
	if (!status.connected) throw new Error(status.error)
	return true
}

export const disconnectUtil = async (wallet: Wallet) => {
	wallet.disconnect()
}
