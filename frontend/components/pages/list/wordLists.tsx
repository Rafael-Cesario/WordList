import { useContext } from "react";
import { ContextWordList } from "./contexts/contextWordList";
import { ListContainer } from "./listContainer";
import { StyledWordLists } from "./styles/styledWordLists";

export const WordLists = () => {
	const { wordList } = useContext(ContextWordList);
	const { next, current, done } = wordList;

	return (
		<StyledWordLists>
			<ListContainer props={{ status: "Próximas", lists: next }} />
			<ListContainer props={{ status: "Estudando", lists: current }} />
			<ListContainer props={{ status: "Finalizadas", lists: done }} />
		</StyledWordLists>
	);
};
