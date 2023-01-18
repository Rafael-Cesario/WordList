import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Configs } from '../../components/pages/list/configs';
import { getCookies } from '../../services/cookies';
import { queriesList } from '../../services/queries/queriesList';
import { StyledList } from '../../styles/styledList';
import { useRouterQuery } from '../../utils/hooks/useRouterQuery';

const ListPage = () => {
	const [listName] = useRouterQuery('Carregando...');
	const [showConfigs, setShowConfigs] = useState(false);

	// temp
	const totalWords = 126;

	const createWordList = async () => {
		const owner = await getCookies('user');
		await queriesList.createWordList({ listName, owner });
		return;
	};

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

				<main>{showConfigs && <Configs props={{ setShowConfigs, listName }} />}</main>
			</StyledList>
		</>
	);
};

export default ListPage;
