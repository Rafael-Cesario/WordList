import { WordListContainer } from "./wordListContainer";
import { StyledListContainer as StyledListContainer } from "./styles/styledListContainer";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";

export const ListContainer = () => {
	const { data: wordLists, error, isLoading } = useQueriesWordListSWR();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Um erro ocorreu</p>;

	const { next, current, done } = wordLists;

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
