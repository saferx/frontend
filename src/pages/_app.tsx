import ProvidersContainer from '@/components/containers/ProvidersContainer/ProvidersContainer'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ProvidersContainer>
			<Component {...pageProps}/>
		</ProvidersContainer>
	)
}
