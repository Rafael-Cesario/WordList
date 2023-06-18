import { ObjectId } from "mongoose";

export interface UserCookies {
	email: string;
	ID: ObjectId;
	token: string;
}
