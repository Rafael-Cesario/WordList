import useSWR from "swr";
import { request } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { IGetWords } from "../../interfaces/interfaceWords";
import { QueriesTypeWords } from "../../services/queries/types/queriesTypeWords";

export const useQueriesWordsSWR = () => {
	const queriesTypeWords = new QueriesTypeWords();
	const words: IGetWords = { listIndex: "0", listName: "list01", owner: "rafael@hotmail.com", status: "next" };

	const fetcher = (query: RequestDocument) => request("http://localhost:4000", query, { words });

	const { data, error, isLoading, mutate } = useSWR(queriesTypeWords.GET_WORDS, fetcher);

	return {
		words: data?.getWords.words as string[][],
		error,
		isLoading,
		mutate,
	};
};
