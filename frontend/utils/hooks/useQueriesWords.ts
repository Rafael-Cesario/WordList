import produce from "immer";
import { useEffect, useState } from "react";
import { TypeListStatus } from "../../interfaces/interfaceWordList";
import { IRemoveWords } from "../../interfaces/interfaceWords";
import { getCookies } from "../../services/cookies";
import { QueriesWords } from "../../services/queries/queriesWords";
import { useRouterQuery } from "./useRouterQuery";

export const useQueriesWords = () => {
	const [words, setWords] = useState<string[][]>([]);
	const { listName, listIndex, listStatus } = useRouterQuery("");
	const queriesWords = new QueriesWords();

	const getWords = async () => {
		if (!listName) return;

		const status = listStatus as TypeListStatus;
		const owner = await getCookies("user");
		const words = { owner, listName, listIndex, status };

		const getWords = await queriesWords.getWords({ words });
		setWords(getWords.words);
	};

	const addWords = async (inputWords: [string, string]) => {
		const status = listStatus as TypeListStatus;
		const [term, definition] = inputWords;
		const owner = await getCookies("user");

		const variableWords = { listName, owner, definition, term, listIndex, status };

		// todo > handle if error
		await queriesWords.addWords({ words: variableWords });

		const newWords = produce(words, draft => {
			draft.push(inputWords);
		});

		setWords(newWords);
	};

	const removeWords = async (index: string) => {
		const status = listStatus as TypeListStatus;
		const owner = await getCookies("user");
		const wordIndex = String(index);
		const queryVariables: IRemoveWords = { owner, listName, listIndex, status, wordIndex };
		await queriesWords.removeWords({ words: queryVariables });

		setWords(
			produce(words, draft => {
				draft.splice(Number(wordIndex), 1);
			})
		);
	};

	const renameWords = async (wordIndex: string, values: { term: string; definition: string }) => {
		const owner = await getCookies("user");
		const newWords = [values.term || words[Number(wordIndex)][0], values.definition || words[Number(wordIndex)][1]];

		// todo > handle error , send notification
		await queriesWords.renameWords({
			words: {
				owner,
				listIndex,
				listName,
				wordIndex,
				newWords,
				listStatus: listStatus as TypeListStatus,
			},
		});
	};

	useEffect(() => {
		getWords();
	}, [listName]);

	return { words, addWords, removeWords, renameWords };
};
