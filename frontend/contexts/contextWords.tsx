/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from "react";
import { IContextWords } from "../interfaces/interfaceWords";
import { useQueriesWords } from "../utils/hooks/useQueriesWords";

export const ContextWords = createContext<IContextWords>({
	words: [],
	addWords: (inputWords: [string, string]) => Promise.resolve(),
	removeWords: (index: string) => Promise.resolve(),
	renameWords: (index: string, values: { term: string; definition: string }) => Promise.resolve(),
});

export const ContextWordsProvider = ({ children }: { children: ReactNode }) => {
	const { words, addWords, removeWords, renameWords } = useQueriesWords();

	return (
		<ContextWords.Provider
			value={{
				words,
				addWords,
				removeWords,
				renameWords,
			}}>
			{children}
		</ContextWords.Provider>
	);
};
