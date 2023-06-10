import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyle } from "@/styles/globalStyle";

export const metadata = {
	title: "WordList",
	description: "A website to learn a new language.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="pt-br">
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
