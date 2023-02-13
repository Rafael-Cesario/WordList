/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from "react";
import { useQueriesWordList } from "../../../../utils/hooks/useQueriesWordList";

export type WordListType = {
	next: string[][][];
	current: string[][][];
	done: string[][][];
};

interface IContextWordList {
	wordList: WordListType;
	setWordList: (newState: WordListType) => void;
	deleteWordList: () => Promise<void>;
	changeWordListStatus: () => Promise<void>;
}

const defaultValues: IContextWordList = {
	wordList: {
		next: [],
		current: [],
		done: [],
	},
	setWordList: () => {},
	deleteWordList: () => Promise.resolve(),
	changeWordListStatus: () => Promise.resolve(),
};

export const ContextWordList = createContext<IContextWordList>(defaultValues);

export const ContextWordListProvider = ({ children }: { children: ReactNode }) => {
	const { wordList, setWordList, deleteWordList, changeWordListStatus } = useQueriesWordList();

	return <ContextWordList.Provider value={{ wordList, setWordList, deleteWordList, changeWordListStatus }}>{children}</ContextWordList.Provider>;
};
