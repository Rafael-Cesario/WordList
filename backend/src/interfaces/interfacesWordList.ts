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
	wordListStatus: 'next' | 'current' | 'done';
	wordListIndex: number;
}
