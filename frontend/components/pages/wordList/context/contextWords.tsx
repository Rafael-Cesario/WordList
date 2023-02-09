/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from "react";
import { useQueriesWords } from "../hooks/useQueriesWords";

interface ContextProps {
	children: ReactNode;
}

interface IDefaultValues {
	words: string[][];
	addWords: (inputWords: [string, string]) => Promise<void>;
	removeWords: (index: string) => Promise<void>;
	renameWords: (index: string, values: { term: string; definition: string }) => Promise<void>;
}

export const ContextWords = createContext<IDefaultValues>({
	words: [],
	addWords: (inputWords: [string, string]) => Promise.resolve(),
	removeWords: (index: string) => Promise.resolve(),
	renameWords: (index: string, values: { term: string; definition: string }) => Promise.resolve(),
});

export const ContextWordsProvider = ({ children }: ContextProps) => {
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
