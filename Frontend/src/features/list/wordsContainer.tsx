"use client";
import { StyledWordsContainer } from "./styles/wordsContainerStyle";
import { groupWords } from "./utils/groupWords";
import { useOneList } from "@/hooks/list/useOneList";
import { WordsGroup } from "./wordsGroup";

interface Props {
	list: { listID: string; userID: string };
}

// todo > loading
export const WordsContainer = ({ list: { listID, userID } }: Props) => {
	const { list } = useOneList(listID, userID);
	const { words, wordsPerWordList, timesUntilLearning } = list;
	const { learned, notLearned } = groupWords(words, wordsPerWordList, timesUntilLearning);

	return (
		<StyledWordsContainer>
			<WordsGroup title={"Estudando"} words={notLearned} />
			<WordsGroup title={"Aprendidas"} words={learned} />
		</StyledWordsContainer>
	);
};
