
type LogoSize = 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

export default function Logo(props: ({size: string | number, className?: string })) {
	return (
		<div style={{ fontSize: props.size}} className={props.className}>
			Safe<span className="text-accent">Rx</span>
		</div>
	)
}
