export interface IListType {
	owner: string;
	listName: string;
	wordLists: {
		next: string[][][];
		current: string[][][];
		done: string[][][];
	};
}

export interface IMessageResponse {
	message: string;
}

export interface ICreateList {
	owner: string;
	listName: string;
}

export interface IChangeListName {
	owner: string;
	oldName: string;
	newName: string;
}

export interface IDeleteList {
	owner: string;
	listName: string;
}

export interface IGetLists {
	owner: string;
}
