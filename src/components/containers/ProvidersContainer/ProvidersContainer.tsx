import MedicationContextProvider from "@/providers/MedicationContextProvider";
import UserRegistryContextProvider from "@/providers/UserRegistryContextProvider";
import { PropsWithChildren } from "react";

export default function ProvidersContainer(props: PropsWithChildren) {
	return (
		<UserRegistryContextProvider>
			<MedicationContextProvider>
				{props.children}
			</MedicationContextProvider>
		</UserRegistryContextProvider>
	)
}
