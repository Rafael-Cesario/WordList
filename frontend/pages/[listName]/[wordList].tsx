import Head from 'next/head';
import { AddWords } from '../../components/pages/wordList/addWords';
import { Header } from '../../components/pages/wordList/header';
import { Menu } from '../../components/pages/wordList/menu';
import { StyledWordList } from '../../components/pages/wordList/styles/styledWordList';
import { Words } from '../../components/pages/wordList/words';

const WordList = () => {
	return (
		<>
			<Head>
				<title>WordList</title>
			</Head>

			<StyledWordList>
				<Header />

				<main>
					<Menu />
					<AddWords />
					<Words />
				</main>
			</StyledWordList>
		</>
	);
};

export default WordList;
