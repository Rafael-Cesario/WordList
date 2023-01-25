export interface ListType {
	owner: string;
	listName: string;
	wordLists: {
		next: string[][];
		current: string[][];
		done: string[][];
	};
}

export interface CreateListArgs {
	newList: {
		owner: string;
		listName: string;
	};
}

export interface MessageResponse {
	message: string;
}

export interface ChangesArgs {
	changes: {
		owner: string;
		oldName: string;
		newName: string;
	};
}

export interface DeleteListArgs {
	owner: string;
	listName: string;
}

export interface WordListArgs {
	wordList: {
		owner: string;
		listName: string;
	};
}

export interface GetWordListsArgs {
	getWordLists: {
		owner: string;
		listName: string;
	};
}
