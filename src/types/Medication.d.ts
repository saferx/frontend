interface Medication {
	tokenId: string
	balance: number
	name?: string
	dosage?: number
	quantity?: number
	timestamp?: number
	remarks?: string
	pid?: string
}

interface MedicationMetadata {
	name?: string
	dosage?: number
	timestamp?: number
	remarks?: string
	pid?: string
}
