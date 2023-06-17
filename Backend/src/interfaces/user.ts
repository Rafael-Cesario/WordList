import mongoose, { ObjectId } from "mongoose";

export interface IUser {
	ID: mongoose.Types.ObjectId;
	email: string;
	password: string;
}

export interface ICreateUser {
	createUser: {
		email: string;
		password: string;
	};
}

export interface RCreateUser {
	message: string;
}

export interface IFindOneUser {
	email: string;
}

export interface RFindOneUser {
	user?: IUser;
	message?: string;
}

export interface ILogin {
	login: {
		email: string;
		password: string;
	};
}

export interface RLogin {
	token: string;
	ID: ObjectId;
	message: string;
}
