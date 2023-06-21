export interface IList {
	userID: string;
	_id: string;
	name: string;
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
	createList: {
		list: IList;
	};
}

export interface IRenameList {
	renameList: {
		userID: string;
		ID: string;
		newName: string;
	};
}

export interface RRenameList {
	renameList: {
		list: IList;
	};
}
