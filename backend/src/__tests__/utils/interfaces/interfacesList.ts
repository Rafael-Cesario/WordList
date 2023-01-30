export interface ICreateList {
	newList: {
		owner: string;
		listName: string;
	};
}

export interface IChangeListName {
	changes: {
		owner: string;
		oldName: string;
		newName: string;
	};
}

export interface IDeleteList {
	owner: string;
	listName: string;
}

export interface IGetLists {
	owner: string;
}
