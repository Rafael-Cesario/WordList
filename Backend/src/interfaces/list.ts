import { ObjectId } from "mongoose";

export interface List {
	userID: string;
	_id: ObjectId;
	name: string;
}

export interface IReadLists {
	userID: ObjectId;
}

export interface RReadLists {
	readLists: List[];
}

export interface ICreateList {
	createList: {
		userID: ObjectId;
		name: string;
	};
}

export interface RCreateList {
	createList: {
		list: List;
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
		list: List;
	};
}

export interface IDeleteList {
	deleteList: {
		userID: string;
		ID: string;
	};
}

export interface RDeleteList {
	deleteList: {
		message: string;
	}
}