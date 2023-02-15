import useSWR from "swr";
import { request } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { IGetWords } from "../../interfaces/interfaceWords";
import { QueriesTypeWords } from "../../services/queries/types/queriesTypeWords";
import { useEffect, useState } from "react";
import { IStorage } from "../../interfaces/storage";

export const useQueriesWordsSWR = () => {
	const [{ listIndex, listName, listStatus, owner }, setStorage] = useState<IStorage>({
		listIndex: "",
		listName: "",
		listStatus: "next",
		owner: "",
	});

	const queriesTypeWords = new QueriesTypeWords();
	const words: IGetWords = { listIndex, listName, owner, status: listStatus };

	const fetcher = ([query, words]: [RequestDocument, IGetWords]) => request("http://localhost:4000", query, { words });

	const { data, error, isLoading, mutate } = useSWR([queriesTypeWords.GET_WORDS, words], fetcher);

	useEffect(() => {
		const storage = localStorage.getItem("wordList");
		if (!storage) return console.log("Error lists");

		const data = JSON.parse(storage) as IStorage;
		setStorage(data);
	}, []);

	return {
		words: data?.getWords.words as string[][],
		error,
		isLoading,
		mutate,
	};
};
