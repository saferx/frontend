import { Wallet } from "0xsequence";
import { MedicationABI } from "@/constants/abi/Medication";
import { contractDetails } from "@/constants/contractDetails";
import { ethers } from "ethers";
import moment from "moment";

const intf = new ethers.utils.Interface(MedicationABI)

export const mintUtil = async (wallet: Wallet, patient: string, pid: string, medicationsToMint: MintMedicationInput[]) => {
	const calldatas = medicationsToMint.map(m => intf.encodeFunctionData('mint', [patient, m.amount, m.name, m.dosage, m.remark, pid]))
	const transactions = calldatas.map(c => ({ to: contractDetails.medicationAddress, data: c}))
	const signer = await wallet.getSigner()
	await signer.sendTransactionBatch(transactions)
}

export const redeemUtil = async (wallet: Wallet, pharmacist: string, tokenAndAmounts: RedeemTokenInput[]) => {
	const currTimestamp = moment().unix()
	const calldatas = tokenAndAmounts.filter(ta => ta.amount > 0).map(ta => intf.encodeFunctionData('redeem', [ta.tokenId, pharmacist, ta.amount, currTimestamp]))
	const transactions = calldatas.map(c => ({ to: contractDetails.medicationAddress, data: c}))
	const signer = await wallet.getSigner()
	await signer.sendTransactionBatch(transactions)
}

export const getBalanceForUtil = async (wallet: Wallet, tokenId: string) => {
	const signer = await wallet.getSigner()
	const contract = new ethers.Contract(contractDetails.medicationAddress, MedicationABI, signer)
	const val = await contract.getBalanceFor(tokenId)
	return val.toNumber()
}
