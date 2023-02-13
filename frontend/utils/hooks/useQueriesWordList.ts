import { useEffect, useState } from "react";
import { getCookies } from "../../services/cookies";
import { QueriesWordList } from "../../services/queries/queriesWordList";
import { useRouterQuery } from "./useRouterQuery";
import { WordListType } from "../../components/pages/list/contexts/contextWordList";
import { useRouter } from "next/router";

export const useQueriesWordList = () => {
	const queriesWordList = new QueriesWordList();
	const router = useRouter();
	const { listName } = useRouterQuery("");
	const { listIndex } = useRouterQuery("");

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

	const deleteWordList = async () => {
		const owner = await getCookies("user");

		// todo > ListStatus
		await queriesWordList.deleteWordList({
			listName,
			owner,
			wordListIndex: Number(listIndex),
			wordListStatus: "next",
		});

		router.push(`/${listName}`);
	};

	useEffect(() => {
		getWordList();
	}, [listName]);

	return { wordList, setWordList, deleteWordList };
};
