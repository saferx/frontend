import { TokenBalance, TokenMetadata } from "0xsequence/dist/declarations/src/indexer"

export const parseTokenData = (token: TokenBalance): Medication => {
	const tokenId = token.tokenID
	const balance = parseInt(token.balance)
	if (!token.tokenMetadata) return ({tokenId, balance})
	const name = token.tokenMetadata.name
	const attributes = token.tokenMetadata.attributes
	const dosage = parseInt(`${(attributes.find(a => a.trait_type === 'Dosage') || {}).value || '0'}`)
	const timestamp = parseInt(`${(attributes.find(a => a.trait_type === 'Date') || {}).value || '0'}`)
	const remarks = `${(attributes.find(a => a.trait_type === 'Remarks') || {}).value || ''}`
	const pid = `${(attributes.find(a => a.trait_type === 'Prescription ID') || {}).value || ''}`
	return ({tokenId, balance, name, dosage, remarks, pid, timestamp })
}

export const parseTokenMetadata = (tokenMetadata: TokenMetadata): MedicationMetadata => {
	const name = tokenMetadata.name
	const attributes = tokenMetadata.attributes
	const dosage = parseInt(`${(attributes.find(a => a.trait_type === 'Dosage') || {}).value || '0'}`)
	const timestamp = parseInt(`${(attributes.find(a => a.trait_type === 'Date') || {}).value || '0'}`)
	const remarks = `${(attributes.find(a => a.trait_type === 'Remarks') || {}).value || ''}`
	const pid = `${(attributes.find(a => a.trait_type === 'Prescription ID') || {}).value || ''}`
	return ({ name, dosage, remarks, pid, timestamp })
}
