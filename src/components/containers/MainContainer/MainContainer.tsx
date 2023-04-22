import { PropsWithChildren } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import Sidebar from "../Sidebar/Sidebar";

export default function MainContainer(props: PropsWithChildren) {
	return (
		<div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
			<Sidebar/>
			<MobileHeader/>
			<div className="flex-1 h-full with-bg-2 p-8 pt-36 md:p-16 overflow-scroll">
				{props.children}
			</div>
		</div>
	);
}
