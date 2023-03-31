export interface IAddWords {
	term: string;
	definition: string;
	listName: string;
	owner: string;
	listIndex: string;
	status: 'next' | 'current' | 'done';
}

export interface IRemoveWords {
	owner: string;
	listName: string;
	listIndex: string;
	wordIndex: string;
	status: 'next' | 'current' | 'done';
}

export interface IGetWords {
	owner: string;
	listName: string;
	listIndex: string;
	status: 'next' | 'current' | 'done';
}

export interface IGetList {
	owner: string;
	listName: string;
}

export interface ISaveList {
	owner: string;
	listName: string;
	list: {
		wordLists: {
			next: string[][][];
			current: string[][][];
			done: string[][][];
		};
	};
}

export interface IRenameWords {
	owner: string;
	listName: string;
	listStatus: 'next' | 'current' | 'done';
	listIndex: string;
	wordIndex: string;
	newWords: string[];
}

export interface IContextWords {
	words: string[][];
	addWords: (inputWords: [string, string]) => Promise<void>;
	removeWords: (index: string) => Promise<void>;
	renameWords: (index: string, values: { term: string; definition: string }) => Promise<void>;
}
