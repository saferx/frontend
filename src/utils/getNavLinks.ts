import { NavLink } from "@/types/NavLink";
import { IconClock, IconDashboard, IconHistory, IconPill } from '@tabler/icons-react'

const patient = [
	{name: 'Prescriptions', icon: IconPill, path: '/'},
	{name: 'History', icon: IconHistory, path: '/history'},
]

const pharmacist = [
	{name: 'Recent Transactions', icon: IconClock, path: '/history'},
	{name: 'Patient Records', icon: IconHistory, path: '/patient-records'},
]

const doctor = [
	{name: 'Sign New', icon: IconDashboard, path: '/'},
	{name: 'Patient Records', icon: IconHistory, path: '/patient-records'},
]

export default function getNavLinks(role?: UserRole | null): NavLink[] {
	switch (role) {
		case 'Patient': return patient
		case 'Pharmacist': return pharmacist
		case 'Doctor': return doctor
		default: return []
	}
}
