import { useContext } from "react";
import { ContextWordList } from "./contexts/contextWordList";
import { ListContainer } from "./listContainer";
import { StyledWordListContainer } from "./styles/styledWordLists";

export const WordListContainer = () => {
	const { wordList } = useContext(ContextWordList);
	const { next, current, done } = wordList;

	return (
		<StyledWordListContainer>
			<ListContainer props={{ status: "Próximas", lists: next }} />
			<ListContainer props={{ status: "Estudando", lists: current }} />
			<ListContainer props={{ status: "Finalizadas", lists: done }} />
		</StyledWordListContainer>
	);
};
