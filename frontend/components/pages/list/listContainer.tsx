import { WordListContainer } from "./wordListContainer";
import { StyledListContainer as StyledListContainer } from "./styles/styledListContainer";
import { useContext } from "react";
import { ContextWordList } from "../../../contexts/contextWordList";

export const ListContainer = () => {
	const { wordList } = useContext(ContextWordList);
	const { next, current, done } = wordList;

	return (
		<StyledListContainer>
			<div className='wordLists'>
				<WordListContainer props={{ status: ["Próximas", "next"], lists: next }} />
				<WordListContainer props={{ status: ["Estudando", "current"], lists: current }} />
				<WordListContainer props={{ status: ["Finalizadas", "done"], lists: done }} />
			</div>
		</StyledListContainer>
	);
};
