export interface IAddWords {
	term: string;
	definition: string;
	listName: string;
	owner: string;
	listIndex: number;
	status: 'next' | 'current' | 'done';
}

export interface IRemoveWords {
	owner: string;
	listName: string;
	listIndex: number;
	wordIndex: number;
	status: 'next' | 'current' | 'done';
}

export interface IGetWords {
	owner: string;
	listName: string;
	listIndex: number;
	status: 'next' | 'current' | 'done';
}
