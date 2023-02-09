import type { AppProps } from "next/app";
import { StyledGlobal } from "../styles/global";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<StyledGlobal />
		</>
	);
}
