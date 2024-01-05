import { Providers } from "@/components/providers";
import { StyledGlobal } from "@/styles/styled-global";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

interface Props {
	children: React.ReactNode;
	authentication: React.ReactNode;
}

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "WordList",
	description: "Memorize words",
};

export default function RootLayout({ children, authentication }: Props) {
	const isAuthenticated = false;

	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<Providers>
					<StyledGlobal />
					{isAuthenticated ? children : authentication}
				</Providers>
			</body>
		</html>
	);
}
