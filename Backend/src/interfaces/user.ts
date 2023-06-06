export interface IUser {
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
