import useSWR from "swr";
import { request } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { QueriesTypeWordList } from "../../services/queries/types/queriesTypeWordList";

export const useQueriesWordListSWR = () => {
	const queriesTypeWordList = new QueriesTypeWordList();
	// todo > get listname and owner from local storage
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
