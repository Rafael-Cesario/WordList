import Head from 'next/head';
import Link from 'next/link';
import { AddWords } from '../../components/pages/wordList/addWords';
import { Menu } from '../../components/pages/wordList/menu';
import { StyledMain } from '../../components/pages/wordList/styles/styledMain';
import { StyledWordList } from '../../styles/styledWordList';
import { useRouterQuery } from '../../utils/hooks/useRouterQuery';

const WordList = () => {
	const { link, listName } = useRouterQuery('Carregando...');

	// temp
	const totalWords = 100;
	const listStatus = 'Diariamente';

	return (
		<>
			<Head>
				<title>WordList</title>
			</Head>

			<StyledWordList>
				<header>
					<Link className='link' href={`/${link}`}>
						Voltar
					</Link>
					<h1 className='title'>{listName}</h1>

					<div className='info'>
						<p>Palavras: {totalWords}</p>
						<p>Estudar lista: {listStatus}</p>
					</div>
				</header>

				<StyledMain>
					<Menu />
					<AddWords />
				</StyledMain>
			</StyledWordList>
		</>
	);
};

export default WordList;
