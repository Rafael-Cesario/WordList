import { Emptylist } from "./emptyList";
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
				{lists.map((list, index) => (
					<WordList key={`${list[0]}-${index}`} props={{ index, list }} />
				))}
			</div>
		</StyledListContainer>
	);
};
