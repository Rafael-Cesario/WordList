import produce from 'immer';
import { useEffect, useState } from 'react';
import { getCookies } from '../../services/cookies';
import { QueriesWords } from '../../services/queries/queriesWords';
import { useRouterQuery } from './useRouterQuery';

export const useQueriesWords = () => {
	const [words, setWords] = useState<string[][]>([]);
	const { listName, listIndex } = useRouterQuery('');
	const queriesWords = new QueriesWords();

	const getWords = async () => {
		if (!listName) return;

		// todo > get status from database
		const status: 'next' | 'current' | 'done' = 'next';
		const owner = await getCookies('user');
		const words = { owner, listName, listIndex, status };

		const getWords = await queriesWords.getWords({ words });
		setWords(getWords.words);
	};

	const addWords = async (inputWords: [string, string]) => {
		// todo > get status from database
		const status: 'next' | 'current' | 'done' = 'next';
		const [term, definition] = inputWords;
		const owner = await getCookies('user');

		const variableWords = { listName, owner, definition, term, listIndex, status };

		// todo > handle if error
		await queriesWords.addWords({ words: variableWords });

		const newWords = produce(words, draft => {
			draft.push(inputWords);
		});

		setWords(newWords);
	};

	useEffect(() => {
		getWords();
	}, [listName]);

	return { words, addWords: addWords };
};
