interface WordListsProps {
	props: {
		wordLists: {
			next: string[][];
			current: string[][];
			done: string[][];
		};
	};
}

export const WordLists = ({ props: { wordLists } }: WordListsProps) => {
	const { next, current, done } = wordLists;

	console.log({ next, current, done });

	// todo > show lists on the page
	return <h1>WordLists component</h1>;
};
