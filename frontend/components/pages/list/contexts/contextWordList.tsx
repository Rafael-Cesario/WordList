import { createContext, ReactNode } from "react";
import { useQueriesWordList } from "../hooks/useQueriesWordList";

interface IContextWordList {
	wordList: {
		next: string[][][];
		current: string[][][];
		done: string[][][];
	};
}

const defaultValues = {
	wordList: {
		next: [],
		current: [],
		done: [],
	},
};

export const ContextWordList = createContext<IContextWordList>(defaultValues);

export const ContextWordListProvider = ({ children }: { children: ReactNode }) => {
	const { wordList } = useQueriesWordList();

	return <ContextWordList.Provider value={{ wordList }}>{children}</ContextWordList.Provider>;
};
