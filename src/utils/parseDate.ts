export function fromSeconds(timestamp: number) {
	var t = new Date(1970, 0, 1)
	t.setSeconds(timestamp)
	return t
}

export function formattedFromSeconds(timestamp: number) {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(today.getDate() - 1)

	const d = fromSeconds(timestamp)

	const timeDiff = Math.abs(today.getTime() - d.getTime());
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	const diffMonths = Math.ceil(diffDays / 30);

	if (d.toDateString() === today.toDateString()) {
		return 'Today';
	} else if (d.toDateString() === yesterday.toDateString()) {
		return 'Yesterday';
	} else if (diffDays < 30) {
		return `${diffDays} days ago`;
	} else {
		return `${diffMonths} months ago`;
	}
}

export function ISOFromSeconds(timestamp: number) {
	const d = fromSeconds(timestamp)
	return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`
}
