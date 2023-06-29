import { ObjectId } from "mongoose";

export type CookiesKeys = "user" | "list";

export interface UserCookies {
	email: string;
	ID: ObjectId;
	token: string;
}

export interface ListCookies {
	listID: string;
	userID: string;
	listName: string;
}

export interface SetCookies {
	key: CookiesKeys;
	value: string;
	maxAge: number;
}
