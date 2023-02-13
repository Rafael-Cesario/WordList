import { Emptylist } from "./emptyList";
import { EmptyWordList } from "./emptyWordList";
import { StyledListContainer } from "./styles/styledListContainer";
import { WordList } from "./wordList";

interface ListContainerProps {
	props: {
		status: string;
		lists: string[][][];
	};
}

export const ListContainer = ({ props: { status, lists } }: ListContainerProps) => {
	if (!lists.length) return <Emptylist props={{ status }} />;

	return (
		<StyledListContainer>
			<h1>{status}</h1>

			<div className='lists'>
				{lists.map((list, index) => {
					if (!list.length) return <EmptyWordList props={{ index }} />;

					return <WordList key={`${list[0]}-${index}`} props={{ index, list }} />;
				})}
			</div>
		</StyledListContainer>
	);
};
