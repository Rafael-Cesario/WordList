import { Emptylist } from "./emptyList";
import { StyledWordListContainer } from "./styles/styledWordListContainer";
import { WordList } from "./wordList";

interface ListContainerProps {
	props: {
		status: string;
		lists: string[][][];
	};
}

export const WordListContainer = ({ props: { status, lists } }: ListContainerProps) => {
	if (!lists.length) return <Emptylist props={{ status }} />;

	return (
		<StyledWordListContainer>
			<h1>{status}</h1>

			<div className='lists'>
				{lists.map((list, index) => (
					<WordList key={`${list[0]}-${index}`} props={{ index, list }} />
				))}
			</div>
		</StyledWordListContainer>
	);
};
