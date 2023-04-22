export default function parseRole(num: number): UserRole {
	switch (num) {
		case 1: return "Patient"
		case 2: return "Pharmacist"
		case 3: return "Doctor"
		default: throw new Error("Invalid Role")
	}
}
