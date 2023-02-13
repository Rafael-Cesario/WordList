export type TypeListStatus = "next" | "current" | "done";

export interface IGetWordLists {
	owner: string;
	listName: string;
}

export interface ICreateWordList {
	owner: string;
	listName: string;
}

export interface IDeleteWordList {
	owner: string;
	listName: string;
	wordListStatus: "next" | "current" | "done";
	wordListIndex: number;
}

export interface IChangeWordListStatus {
	owner: string;
	listName: string;
	wordListIndex: number;
	wordListStatusOld: "next" | "current" | "done";
	wordListStatusNew: "next" | "current" | "done";
}
