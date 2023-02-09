import Head from "next/head";
import Link from "next/link";

const Usage = () => {
	return (
		<div>
			<Head>
				<title>WordList</title>
			</Head>

			<h1>Dicas de uso</h1>
			<p>...</p>
			<Link href={"/main"}>Voltar</Link>
		</div>
	);
};

export default Usage;
