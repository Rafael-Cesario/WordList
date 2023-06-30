/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheWords } from "@/services/cache/cacheWords";
import { client } from "@/services/client";
import { IAddWords, IGetWords, IWord, RAddWords, RGetWords } from "@/services/interfaces/words";
import { QueriesWords } from "@/services/queries/words";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesWords = () => {
	const queriesWords = new QueriesWords();
	const cacheWords = new CacheWords();

	const updateCache = ({ getWords }: IGetWords, words: IWord[]) => {
		const cache = cacheWords.read({ getWords });
		const newWords = words;
		if (!cache) return;
		cache.getWords.words.push(...newWords);
		cacheWords.update({ getWords }, cache);
	};

	const [mutationAddWords] = useMutation<RAddWords, IAddWords>(queriesWords.ADD_WORDS);
	const requestAddWords = async ({ addWords }: IAddWords, getWords: IGetWords) => {
		let message = "";
		let error = "";

		try {
			const { data } = await mutationAddWords({ variables: { addWords } });
			if (!data) throw new Error("Data is undefined");

			const wordsAmount = data.addWords.message.split(":")[1];
			message = `${wordsAmount} ${Number(wordsAmount) === 1 ? "palavra foi adicionada" : "palavras foram adicionadas"}.`;

			updateCache(getWords, addWords.words);
		} catch (e: any) {
			console.log(e.message);
			const [code, word] = e.message.split(":");
			if (code === "duplicated") error += `${word}: `;
			error += catchError(e.message, "word");
		}

		return { message, error };
	};

	const requestGetWords = async (listID: string, userID: string) => {
		let list: { listName: string; words: IWord[] } = { listName: "", words: [] };
		let error = "";

		try {
			const { data } = await client.query<RGetWords, IGetWords>({
				query: queriesWords.GET_WORDS,
				variables: { getWords: { listID: listID, userID: userID } },
			});

			if (!data) throw new Error("Data is undefined");

			list = data?.getWords;
		} catch (e: any) {
			console.log({ error: e.message });
			error = catchError(e.message, "word");
		}

		return { list, error };
	};

	return { requestAddWords, requestGetWords };
};
