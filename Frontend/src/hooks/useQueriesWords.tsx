/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAddWords, RAddWords } from "@/services/interfaces/words";
import { QueriesWords } from "@/services/queries/words";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesWords = () => {
	const queriesWords = new QueriesWords();

	const [mutationAddWords] = useMutation<RAddWords, IAddWords>(queriesWords.ADD_WORDS);
	const requestAddWords = async (addWords: IAddWords) => {
		let message = "";
		let error = "";

		try {
			const { data } = await mutationAddWords({ variables: addWords });
			if (!data) throw new Error("Data is undefined");
			const wordsAmount = data.addWords.message.split(":")[1];
			message = `${wordsAmount} ${Number(wordsAmount) === 1 ? "palavra foi adicionada" : "palavras foram adicionadas"}.`;
		} catch (e: any) {
			console.log(e.message);
			const [code, word] = e.message.split(":");
			if (code === "duplicated") error += `${word}: `;
			error += catchError(e.message, "word");
		}

		return { message, error };
	};

	return { requestAddWords };
};
