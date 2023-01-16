import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WordList = () => {
	const router = useRouter();
	const [listName, setListName] = useState('');

	const getListName = () => {
		const query = router.query as { wordList: string; listName: string };
		const listName = query.listName.replace(/-/g, ' ').replace(/_/g, '-');
		setListName(listName);
	};

	useEffect(() => {
		if (router.isReady) getListName();
	}, [router]);

	return (
		<>
			<Head>
				<title>WordList</title>
			</Head>

			<main>
				<h1>WordList</h1>

				<Link href={`/${listName}`}>Voltar</Link>
			</main>
		</>
	);
};

export default WordList;
