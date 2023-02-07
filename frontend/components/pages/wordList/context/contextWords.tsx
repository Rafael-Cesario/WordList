/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from 'react';
import { useQueriesWords } from '../../../../utils/hooks/useQueriesWords';

interface ContextProps {
	children: ReactNode;
}

interface IDefaultValues {
	words: string[][];
	addWords: (inputWords: [string, string]) => Promise<void>;
	removeWords: (index: string) => Promise<void>;
}

export const ContextWords = createContext<IDefaultValues>({
	words: [],
	addWords: (inputWords: [string, string]) => Promise.resolve(),
	removeWords: (index: string) => Promise.resolve(),
});

export const ContextWordsProvider = ({ children }: ContextProps) => {
	const { words, addWords, removeWords } = useQueriesWords();

	return (
		<ContextWords.Provider
			value={{
				words,
				addWords,
				removeWords,
			}}>
			{children}
		</ContextWords.Provider>
	);
};
