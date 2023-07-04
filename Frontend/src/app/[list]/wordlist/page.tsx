import { Loader } from "@/features/wordList/loader";
import { Menu } from "@/features/wordList/menu";
import { NavigateToList } from "@/components/navigate";
import { StyledWordList } from "@/features/wordList/styles/wordListStyle";
import { WordsContainer } from "@/features/wordList/wordsContainer";

const WordList = () => {
	return (
		<StyledWordList>
			<Loader />
			<NavigateToList />
			<Menu />
			<WordsContainer />
		</StyledWordList>
	);
};

export default WordList;
