import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { QueriesWords } from "../../../services/queries/queriesWords";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { StyledOptions } from "./styles/styledOptions";

interface OptionsProps {
	props: {
		index: number;
		values: { term: string; definition: string };
	};
}

export const Options = ({ props: { index, values } }: OptionsProps) => {
	const queriesWords = new QueriesWords();
	const { words, mutate } = useQueriesWordsSWR();

	// todo > get from LocalStorage
	const listIndex = "0";
	const listName = "list01";
	const owner = "rafael@hotmail.com";
	const status: TypeListStatus = "next";
	const wordIndex = String(index);

	const removeWords = async () => {
		await queriesWords.removeWords({ words: { listIndex, listName, owner, status, wordIndex } });
		mutate();
	};

	const renameWords = async () => {
		const newWords = [values.term || words[Number(wordIndex)][0], values.definition || words[Number(wordIndex)][1]];
		await queriesWords.renameWords({ words: { listIndex, listName, listStatus: status, newWords, owner, wordIndex } });
		mutate();
	};

	return (
		<StyledOptions>
			<button onClick={() => renameWords()}>Salvar</button>
			<button onClick={() => removeWords()}>Excluir</button>
		</StyledOptions>
	);
};
