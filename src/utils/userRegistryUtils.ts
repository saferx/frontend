import { ethers } from "ethers";
import { contractDetails } from "../constants/contractDetails";
import { Wallet } from "0xsequence";
import { UserRegistryABI } from "@/constants/abi/UserRegistry";

const intf = new ethers.utils.Interface(UserRegistryABI)

export const initUserUtil = async (wallet: Wallet, name: string, role: string) => {
	var roleId = 0
	switch (role) {
		case 'Patient': roleId = 1; break;
		case 'Pharmacist': roleId = 2; break;
		case 'Doctor': roleId = 3; break;
		default: return;
	}
	const calldata = intf.encodeFunctionData('initUser', [name, roleId])
	const transaction = { to: contractDetails.userRegistryAddress, data: calldata }
	const signer = await wallet.getSigner()
	await signer.sendTransaction(transaction)
}

export const getUserUtil = async (wallet: Wallet, address?: string) => {
	const signer = await wallet.getSigner()
	const contract = new ethers.Contract(contractDetails.userRegistryAddress, UserRegistryABI, signer)
	if (address) {
		return await contract.getUser(address)
	} else {
		return await contract.getUser()
	}
}

export const deleteUserUtil = async (wallet: Wallet) => {
	const intf = new ethers.utils.Interface(UserRegistryABI)
	const calldata = intf.encodeFunctionData('deleteUser', [])
	const transaction = { to: contractDetails.userRegistryAddress, data: calldata }
	const signer = await wallet.getSigner()
	await signer.sendTransaction(transaction)
}

export const getHistoryUtil = async (wallet: Wallet, address?: string) => {
	const signer = await wallet.getSigner()
	const contract = new ethers.Contract(contractDetails.userRegistryAddress, UserRegistryABI, signer)
	if (address) {
		return await contract.getHistory(address)
	} else {
		return await contract.getHistory()
	}
}
