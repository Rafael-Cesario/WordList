import Head from "next/head";

interface PageHeadProps {
	title: string;
}

export const PageHead = ({ title }: PageHeadProps) => {
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
};
