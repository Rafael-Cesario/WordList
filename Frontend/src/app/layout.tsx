import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyle } from "@/styles/globalStyle";
import { Roboto_Slab } from "next/font/google";

export const metadata = {
	title: "WordList",
	description: "A website to learn a new language.",
};

const robotoSlab = Roboto_Slab({
	display: "swap",
	subsets: ["latin"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="pt-br" className={robotoSlab.className}>
			<body>
				<StyledComponentsRegistry>
					<GlobalStyle />
					{children}
				</StyledComponentsRegistry>
			</body>
		</html>
	);
};

export default RootLayout;
