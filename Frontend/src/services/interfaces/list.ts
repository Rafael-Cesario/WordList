import { ObjectId } from "mongoose";

export interface IList {
	userID: string;
	_id: ObjectId;
	name: string;
}

export interface IReadLists {
	userID: ObjectId;
}

export interface RReadLists {
	readLists: IList[];
}

export interface ICreateList {
	createList: {
		userID: ObjectId;
		name: string;
	};
}

export interface RCreateList {
	createList: {
		message: string;
	};
}
