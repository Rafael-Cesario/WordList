import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Configs } from '../../components/pages/list/configs';
import { WordLists } from '../../components/pages/list/wordLists';
import { getCookies } from '../../services/cookies';
import { queriesList } from '../../services/queries/queriesList';
import { StyledList } from '../../styles/styledList';
import { useRouterQuery } from '../../utils/hooks/useRouterQuery';

const ListPage = () => {
	const { listName } = useRouterQuery('Carregando...');
	const [showConfigs, setShowConfigs] = useState(false);

	const [wordLists, setWordLists] = useState({ next: [], current: [], done: [] });

	// temp
	const totalWords = 0;

	const createWordList = async () => {
		const owner = await getCookies('user');
		await queriesList.createWordList({ listName, owner });
	};

	const getWordLists = async () => {
		const owner = await getCookies('user');
		const queryWordLists = await queriesList.getWordLists({ owner, listName });
		setWordLists(queryWordLists.wordLists);
	};

	useEffect(() => {
		const isLoading = listName === 'Carregando...';
		isLoading || getWordLists();
	}, [listName]);

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
						<button onClick={() => createWordList()}>Criar Lista</button>
						<button onClick={() => setShowConfigs(!showConfigs)}>Configs</button>
					</div>
				</header>

				<main>
					{showConfigs && <Configs props={{ setShowConfigs, listName }} />}

					<WordLists props={{ wordLists }} />
				</main>
			</StyledList>
		</>
	);
};

export default ListPage;
