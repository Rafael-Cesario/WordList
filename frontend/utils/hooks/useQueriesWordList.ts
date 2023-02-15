import produce from "immer";
import useSWR from "swr";
import { request } from "graphql-request";
import { useState } from "react";
import { getCookies } from "../../services/cookies";
import { QueriesWordList } from "../../services/queries/queriesWordList";
import { useRouterQuery } from "./useRouterQuery";
import { WordListType } from "../../interfaces/interfaceWordList";
import { useRouter } from "next/router";
import { TypeListStatus } from "../../interfaces/interfaceWordList";
import { RequestDocument } from "graphql-request/dist/types";
import { QueriesTypeWordList } from "../../services/queries/types/queriesTypeWordList";

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

	return { wordList, setWordList, changeWordListStatus };
};

export const useQueriesWordListSWR = () => {
	const queriesTypeWordList = new QueriesTypeWordList();
	const getWordLists = { listName: "list01", owner: "rafael@hotmail.com" };

	const fetcher = (query: RequestDocument) => request("http://localhost:4000", query, { getWordLists });

	const { data, error, isLoading, mutate } = useSWR(queriesTypeWordList.GET_WORDlISTS, fetcher);

	return {
		data: data?.getWordLists?.wordLists,
		error,
		isLoading,
		mutate,
	};
};
