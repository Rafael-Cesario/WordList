import Head from "next/head";
import { ContextWordListProvider } from "../../components/pages/list/contexts/contextWordList";
import { AddWords } from "../../components/pages/wordList/addWords";
import { ContextWordsProvider } from "../../components/pages/wordList/context/contextWords";
import { Header } from "../../components/pages/wordList/header";
import { Menu } from "../../components/pages/wordList/menu";
import { StyledWordList } from "../../components/pages/wordList/styles/styledWordList";
import { WordsContainer } from "../../components/pages/wordList/wordsContainer";

const WordList = () => {
	return (
		<ContextWordListProvider>
			<ContextWordsProvider>
				<Head>
					<title>WordList</title>
				</Head>

				<StyledWordList>
					<Header />

					<main>
						<Menu />
						<AddWords />
						<WordsContainer />
					</main>
				</StyledWordList>
			</ContextWordsProvider>
		</ContextWordListProvider>
	);
};

export default WordList;
