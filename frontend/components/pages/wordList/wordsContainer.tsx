import { useContext, useState } from 'react';
import { ContextWords } from './context/contextWords';
import { Options } from './options';
import { StyledWordsContainer } from './styles/styledWords';

export const WordsContainer = () => {
	const [showOptions, setShowOptions] = useState([false, 0]);
	const { words } = useContext(ContextWords);

	if (!words.length)
		return (
			<StyledWordsContainer>
				<p>Suas palavras aparecerão aqui</p>
			</StyledWordsContainer>
		);

	return (
		<StyledWordsContainer className='words'>
			{words.map(([term, definition], index) => {
				return (
					<div key={`${term}-${index}`} className='word' onClick={() => setShowOptions([!showOptions[0], index])}>
						{showOptions[0] && index === showOptions[1] && <Options props={{ index }} />}

						<p>{term}</p>
						<p>{definition}</p>
					</div>
				);
			})}
		</StyledWordsContainer>
	);
};
