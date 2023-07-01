import { ObjectId } from "mongoose";

// todo > CookiesKeys should be a object
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

// todo key should be a keyof typeof CookiesKeys
export interface SetCookies {
	key: string;
	value: string;
	maxAge: number;
}
