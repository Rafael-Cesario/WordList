import { QueriesWords } from "../../../services/queries/queriesWords";
import { useLocalData } from "../../../utils/hooks/useLocalData";
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

	const { storage } = useLocalData();
	const { listIndex, listName, listStatus, owner } = storage;

	const removeWords = async () => {
		await queriesWords.removeWords({
			words: {
				listIndex,
				listName,
				owner,
				status: listStatus,
				wordIndex: String(index),
			},
		});

		mutate();
	};

	const renameWords = async () => {
		const newWords = [values.term || words[index][0], values.definition || words[index][1]];
		await queriesWords.renameWords({
			words: {
				listIndex,
				listName,
				listStatus,
				newWords,
				owner,
				wordIndex: String(index),
			},
		});

		mutate();
	};

	return (
		<StyledOptions role={"options"}>
			<button onClick={() => renameWords()}>Salvar</button>
			<button onClick={() => removeWords()}>Excluir</button>
		</StyledOptions>
	);
};
