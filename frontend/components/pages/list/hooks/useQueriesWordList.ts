import { useEffect, useState } from "react";
import { getCookies } from "../../../../services/cookies";
import { QueriesWordList } from "../../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../../utils/hooks/useRouterQuery";

export const useQueriesWordList = () => {
	const { listName } = useRouterQuery("");
	const queriesWordList = new QueriesWordList();

	const [wordList, setWordList] = useState({
		next: [],
		current: [],
		done: [],
	});

	const getWordList = async () => {
		if (!listName) return;
		const owner = await getCookies("user");
		const response = await queriesWordList.getWordLists({ listName, owner });
		setWordList(response.wordLists);
	};

	useEffect(() => {
		getWordList();
	}, [listName]);

	return { wordList, setWordList };
};
