import { StyledWords } from './styles/styledWords';

export const Words = () => {
	const words: string[][] = [
		['term', 'ddefinitiondefiniti ondefinitiondefinitionde finitiondefinitiondefinitiondefinitio ndefinitiondefinitiondefinitionefinition'],
		['term', 'definition'],
		['term', 'definition'],
	];

	// todo > get Words from db

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
