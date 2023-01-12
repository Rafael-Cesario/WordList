import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Configs } from '../components/list/configs';
import { StyledList } from '../styles/styledList';

const ListPage = () => {
	const router = useRouter();
	const query = router.query.listName as string;
	const listName = query.replace(/-/g, ' ').replace(/_/g, '-');

	const [showConfigs, setShowConfigs] = useState(false);

	const totalWords = 126;

	return (
		<>
			<Head>
				<title>Wordlist</title>
			</Head>

			<StyledList>
				<header>
					<Link href={'/main'}> Voltar </Link>

					<div className='title'>
						<h1>{listName}</h1>
						<span>{totalWords} palavras</span>
					</div>

					<div className='menus'>
						<button>Criar Lista</button>
						<button onClick={() => setShowConfigs(!showConfigs)}>Configs</button>
					</div>
				</header>

				<main>{showConfigs && <Configs props={{ setShowConfigs, listName }} />}</main>
			</StyledList>
		</>
	);
};

export default ListPage;
