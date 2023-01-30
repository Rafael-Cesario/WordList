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
