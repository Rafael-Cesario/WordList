import { Loader } from "@/features/wordList/loader";
import { Menu } from "@/features/wordList/menu";
import { Navigate } from "@/features/wordList/navigate";
import { StyledWordList } from "@/features/wordList/styles/wordListStyle";
import { WordsContainer } from "@/features/wordList/wordsContainer";

const WordList = () => {
	return (
		<StyledWordList>
			<Loader />
			<Navigate />
			<Menu />
			<WordsContainer />
		</StyledWordList>
	);
};

export default WordList;
