import Head from 'next/head';
import Link from 'next/link';
import { StyledWordList } from '../../styles/styledWordList';
import { useRouterQuery } from '../../utils/hooks/useRouterQuery';

const WordList = () => {
	const { link, listName } = useRouterQuery('Carregando...');

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
			</StyledWordList>
		</>
	);
};

export default WordList;
