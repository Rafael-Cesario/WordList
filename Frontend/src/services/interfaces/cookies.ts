import { ObjectId } from "mongoose";

export interface UserCookies {
	email: string;
	ID: ObjectId;
	token: string;
}

export interface SetCookies {
	key: string;
	value: string;
	maxAge: number;
}
