import { useQueriesWords } from '../../../utils/hooks/useQueriesWords';
import { StyledWords } from './styles/styledWords';

export const Words = () => {
	const { words } = useQueriesWords();

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
