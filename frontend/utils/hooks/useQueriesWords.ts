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

	const addWords = async (words: [string, string]) => {
		console.log({ words });
	};

	useEffect(() => {
		getWords();
	}, [listName]);

	return { words, addWords };
};
