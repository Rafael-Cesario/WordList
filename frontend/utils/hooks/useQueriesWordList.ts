import { useEffect, useState } from "react";
import { getCookies } from "../../services/cookies";
import { QueriesWordList } from "../../services/queries/queriesWordList";
import { useRouterQuery } from "./useRouterQuery";
import { WordListType } from "../../components/pages/list/contexts/contextWordList";
import { useRouter } from "next/router";
import produce from "immer";

type TypeListStatus = "next" | "current" | "done";

const status: { [key: string]: TypeListStatus } = {
	next: "current",
	current: "done",
	done: "next",
};

export const useQueriesWordList = () => {
	const queriesWordList = new QueriesWordList();
	const router = useRouter();
	const { listName } = useRouterQuery("");
	const { link, listIndex, listStatus } = useRouterQuery("");

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

	const changeWordListStatus = async () => {
		const owner = await getCookies("user");
		const wordListIndex = Number(listIndex);
		const wordListStatusNew = status[listStatus];
		const wordListStatusOld = listStatus as TypeListStatus;

		await queriesWordList.changeWordListStatus({
			listName,
			owner,
			wordListIndex,
			wordListStatusOld,
			wordListStatusNew,
		});

		const newState = produce(wordList, draft => {
			const [swapList] = draft[wordListStatusOld].splice(wordListIndex, 1);
			draft[wordListStatusNew].push(swapList);
		});

		setWordList(newState);

		const newIndex = wordList[wordListStatusNew].length;
		const newRoute = `/${link}/${wordListStatusNew}-${newIndex}`;
		router.push(newRoute);
	};

	useEffect(() => {
		getWordList();
	}, [listName]);

	return { wordList, setWordList, deleteWordList, changeWordListStatus };
};
