import { Loader } from "@/features/wordList/loader";
import { Navigate } from "@/features/wordList/navigate";
import { StyledWordList } from "@/features/wordList/styles/wordListStyle";

const WordList = () => {
	return (
		<StyledWordList>
			<Loader />
			<Navigate />
		</StyledWordList>
	);
};

export default WordList;
