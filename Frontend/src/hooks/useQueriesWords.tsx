/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAddWords, IUpdateWords, RAddWords, RUpdateWords } from "@/services/interfaces/words";
import { QueriesWords } from "@/services/queries/words";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesWords = () => {
	const queriesWords = new QueriesWords();

	const [mutationAddWords] = useMutation<RAddWords, IAddWords>(queriesWords.ADD_WORDS);
	const [mutationUpdateWords] = useMutation<RUpdateWords, IUpdateWords>(queriesWords.UPDATE_WORDS);

	const requestAddWords = async ({ addWords }: IAddWords) => {
		let message = "";
		let error = "";

		try {
			const { data } = await mutationAddWords({ variables: { addWords } });
			if (!data) throw new Error("Data is undefined");

			const wordsAmount = data.addWords.message.split(":")[1];
			message = `${wordsAmount} ${Number(wordsAmount) === 1 ? "palavra foi adicionada" : "palavras foram adicionadas"}.`;
		} catch (e: any) {
			const [code, word] = e.message.split(":");
			if (code === "duplicated") error += `${word}: `;
			error += catchError(e.message, "word");
		}

		return { message, error };
	};

	const requestUpdateWords = async ({ updateWords }: IUpdateWords) => {
		try {
			await mutationUpdateWords({ variables: { updateWords } });
			// todo > update cache
			return { error: "" };
		} catch (e: any) {
			const error = catchError(e.message, "word");
			return { error };
		}
	};

	return { requestAddWords, requestUpdateWords };
};
