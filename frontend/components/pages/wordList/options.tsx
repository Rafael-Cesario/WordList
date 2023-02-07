import { useContext } from 'react';
import { ContextWords } from './context/contextWords';
import { StyledOptions } from './styles/styledOptions';

interface OptionsProps {
	props: {
		index: number;
	};
}

export const Options = ({ props: { index } }: OptionsProps) => {
	const { removeWords } = useContext(ContextWords);

	// todo rename Word
	const renameWord = () => {
		return;
	};

	return (
		<StyledOptions>
			<button onClick={() => renameWord()}>Editar</button>
			<button onClick={() => removeWords(String(index))}>Excluir</button>
		</StyledOptions>
	);
};
