import { StyledWords } from './styles/styledWords';

interface WordsProps {
	props: {
		words: string[][];
	};
}

export const Words = ({ props: { words } }: WordsProps) => {
	return (
		<StyledWords className='words'>
			{words.map(([term, definition], index) => {
				return (
					<div key={`${term}-${index}`} className='word'>
						<p>{term}</p>
						<p>{definition}</p>
					</div>
				);
			})}
		</StyledWords>
	);
};
