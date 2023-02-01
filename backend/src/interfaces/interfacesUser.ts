export interface IUserType {
	email: string;
	name: string;
	password: string;
}

export interface ICreateUser {
	email: string;
	name: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}
