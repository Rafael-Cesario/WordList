import { ListContainer } from './listContainer';
import { StyledWordLists } from './styles/styledWordLists';

interface WordListsProps {
	props: {
		wordLists: {
			next: string[][][];
			current: string[][][];
			done: string[][][];
		};
	};
}

export const WordLists = ({ props: { wordLists } }: WordListsProps) => {
	const { next, current, done } = wordLists;

	return (
		<StyledWordLists>
			<ListContainer props={{ status: 'Próximas', lists: next }} />
			<ListContainer props={{ status: 'Estudando', lists: current }} />
			<ListContainer props={{ status: 'Finalizadas', lists: done }} />
		</StyledWordLists>
	);
};
