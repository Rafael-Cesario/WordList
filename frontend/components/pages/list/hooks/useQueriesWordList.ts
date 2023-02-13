import { useEffect, useState } from "react";
import { getCookies } from "../../../../services/cookies";
import { QueriesWordList } from "../../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../../utils/hooks/useRouterQuery";
import { WordListType } from "../contexts/contextWordList";

export const useQueriesWordList = () => {
	const { listName } = useRouterQuery("");
	const queriesWordList = new QueriesWordList();

	const [wordList, setWordList] = useState<WordListType>({
		next: [],
		current: [],
		done: [],
	});

	const getWordList = async () => {
		if (!listName) return;
		const owner = await getCookies("user");
		const response = await queriesWordList.getWordLists({ listName, owner });
		const { next, current, done } = response.wordLists;
		setWordList({ next, current, done });
	};

	useEffect(() => {
		getWordList();
	}, [listName]);

	return { wordList, setWordList };
};
