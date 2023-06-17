import mongoose, { ObjectId } from "mongoose";

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
		message: string;
	};
}
