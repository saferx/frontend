import { Icon, IconBuildingHospital, IconPill, IconTemperature } from "@tabler/icons-react";

export const rolesAndIcons: { label: UserRole; icon: Icon; }[] = [
	{ label: 'Patient', icon: IconTemperature },
	{ label: 'Pharmacist', icon: IconPill },
	{ label: 'Doctor', icon: IconBuildingHospital },
]