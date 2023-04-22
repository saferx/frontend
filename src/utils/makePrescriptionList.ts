export const makePrescriptionList = (medicationTokenList: Medication[]) => {
	return Object.values(medicationTokenList.reduce((groups: ({[key: string]: Prescription}), item) => {
		if (!item.pid) return groups
		const group = groups[item.pid] || { _id: item.pid, medications: [], timestamp: item.timestamp };
		const res = {...item}
		group.medications.push(res);
		groups[item.pid] = group;
		return groups;
	  }, {}));
}
