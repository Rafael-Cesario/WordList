export const metadata = {
	title: "WordList",
	description: "A website to learn a new language.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="pt-br">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
