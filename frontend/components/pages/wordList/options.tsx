import { StyledOptions } from './styles/styledOptions';

interface OptionsProps {
	props: {
		index: number;
		removeWords: (index: string) => Promise<void>;
	};
}

export const Options = ({ props: { index, removeWords } }: OptionsProps) => {
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
