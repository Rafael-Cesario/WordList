import { useContext } from "react";
import { ContextWords } from "../../../contexts/contextWords";
import { StyledOptions } from "./styles/styledOptions";

interface OptionsProps {
	props: {
		index: number;
		values: { term: string; definition: string };
	};
}

export const Options = ({ props: { index, values } }: OptionsProps) => {
	const { removeWords, renameWords } = useContext(ContextWords);

	return (
		<StyledOptions>
			<button onClick={() => renameWords(String(index), values)}>Salvar</button>
			<button onClick={() => removeWords(String(index))}>Excluir</button>
		</StyledOptions>
	);
};
