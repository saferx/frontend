import moment from "moment"

export function fromSeconds(timestamp: number) {
	return moment.unix(timestamp)
}

export function relativeToNow(timestamp: number) {
	const m = fromSeconds(timestamp)
	return m.fromNow()
}

export function ISOFromSeconds(timestamp: number) {
	return fromSeconds(timestamp).format('MM/DD/YYYY, h:mm A')
}