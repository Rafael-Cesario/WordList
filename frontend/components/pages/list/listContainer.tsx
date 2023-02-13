import { useContext } from "react";
import { ContextWordList } from "./contexts/contextWordList";
import { WordListContainer } from "./wordListContainer";
import { StyledListContainer as StyledListContainer } from "./styles/styledListContainer";

export const ListContainer = () => {
	const { wordList } = useContext(ContextWordList);
	const { next, current, done } = wordList;

	return (
		<StyledListContainer>
			<div className="wordLists">
				<WordListContainer props={{ status: "Próximas", lists: next }} />
				<WordListContainer props={{ status: "Estudando", lists: current }} />
				<WordListContainer props={{ status: "Finalizadas", lists: done }} />
			</div>
		</StyledListContainer>
	);
};
