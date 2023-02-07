import { useState } from 'react';
import { Options } from './options';
import { StyledWordsContainer } from './styles/styledWords';

interface WordsProps {
	props: {
		words: string[][];
		removeWords: (index: string) => Promise<void>;
	};
}

export const WordsContainer = ({ props: { words, removeWords } }: WordsProps) => {
	const [showOptions, setShowOptions] = useState([false, 0]);

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
						{showOptions[0] && index === showOptions[1] && <Options props={{ index, removeWords }} />}

						<p>{term}</p>
						<p>{definition}</p>
					</div>
				);
			})}
		</StyledWordsContainer>
	);
};
