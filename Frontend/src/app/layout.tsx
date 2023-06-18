import { AllProviders } from "@/components/providers";
import { GlobalStyle } from "@/styles/globalStyle";
import { Roboto_Slab } from "next/font/google";
import { Notification } from "@/components/notification";
import { authenticationUser } from "@/services/authentication";

export const metadata = {
	title: "WordList",
	description: "A website to learn a new language.",
};

const robotoSlab = Roboto_Slab({
	subsets: ["latin"],
});

const RootLayout = ({ children, authentication }: { children: React.ReactNode; authentication: React.ReactNode }) => {
	const isLoggedIn = authenticationUser();

	return (
		<html lang="pt-br" className={robotoSlab.className}>
			<body>
				<AllProviders>
					<GlobalStyle />
					<Notification />
					{isLoggedIn ? children : authentication}
				</AllProviders>
			</body>
		</html>
	);
};

export default RootLayout;
