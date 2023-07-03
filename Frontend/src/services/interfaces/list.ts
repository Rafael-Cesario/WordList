import { IWord } from "./words";

export interface IList {
	userID: string;
	_id: string;
	name: string;
}

export interface ListGlobalState {
	_id: string;
	userID: string;
	name: string;
	words: IWord[];
	wordsPerWordList: number;
	timesUntilLearning: number;
}

export interface IReadLists {
	userID: string;
}

export interface RReadLists {
	readLists: IList[];
}

export interface ICreateList {
	createList: {
		userID: string;
		name: string;
	};
}

export interface RCreateList {
	createList: { list: IList };
}

export interface IRenameList {
	renameList: {
		userID: string;
		ID: string;
		newName: string;
	};
}

export interface RRenameList {
	renameList: { list: IList };
}

export interface IDeleteList {
	deleteList: {
		ID: string;
		userID: string;
	};
}

export interface RDeleteList {
	deleteList: { message: string };
}

export interface IGetOneList {
	listID: string;
	userID: string;
}

export interface RGetOneList {
	getOneList: ListGlobalState;
}

export interface IUpdateConfigs {
	updateConfigs: {
		userID: string;
		listID: string;
		wordsPerWordList: number;
		timesUntilLearning: number;
	};
}

export interface RUpdateConfigs {
	updateConfigs: { message: string };
}

export interface WordListData extends ListGlobalState {
	groupIndex: number;
	answerWith: "term" | "definitions";
}
