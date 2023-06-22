import { ObjectId } from "mongoose";
import { Word } from "./word";

export interface List {
	userID: string;
	_id: ObjectId;
	name: string;
	words: Word[];
}

export interface IReadLists {
	userID: ObjectId;
}

export interface RReadLists {
	readLists: List[];
}

export interface ICreateList {
	createList: {
		userID: string;
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
	};
}
