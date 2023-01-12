import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ListPage = () => {
	const router = useRouter();
	const query = router.query.listName as string;
	const listName = query.replace(/-/g, ' ').replace(/_/g, '-');

	return (
		<>
			<Head>
				<title>Wordlist</title>
			</Head>

			<main>
				<h1>{listName}</h1>
				<Link href={'/main'}> Voltar </Link>
			</main>
		</>
	);
};

export default ListPage;
