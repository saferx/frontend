import { randomBytes } from "crypto";

const LENGTH = 15

export function generatePid(): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	const bytes = randomBytes(LENGTH);
	let result = new Array(LENGTH);
	for (let i = 0; i < LENGTH; i++) {
		result[i] = characters[bytes[i] % charactersLength];
	}
	return result.join('');
}
