/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from "react";
import { useQueriesWordList } from "../hooks/useQueriesWordList";

export type WordListType = {
	next: string[][][];
	current: string[][][];
	done: string[][][];
};

interface IContextWordList {
	wordList: WordListType;
	setWordList: (newState: WordListType) => void;
}

const defaultValues: IContextWordList = {
	wordList: {
		next: [],
		current: [],
		done: [],
	},
	setWordList: () => {},
};

export const ContextWordList = createContext<IContextWordList>(defaultValues);

export const ContextWordListProvider = ({ children }: { children: ReactNode }) => {
	const { wordList, setWordList } = useQueriesWordList();

	return <ContextWordList.Provider value={{ wordList, setWordList }}>{children}</ContextWordList.Provider>;
};
