import { Providers } from "@/components/providers";
import { StyledGlobal } from "@/styles/global";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "WordList",
	description: "Memorize words",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<Providers>
					<StyledGlobal />
					{children}
				</Providers>
			</body>
		</html>
	);
}
