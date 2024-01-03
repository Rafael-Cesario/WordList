export interface UserInput {
	email: string;
	name: string;
	password: string;
}

export type CreateUserInput = {
	createUserData: UserInput;
};

export interface CreateUserResponse {
	createUser: string;
}

export type LoginInput = {
	loginData: {
		email: string;
		password: string;
	};
};

export interface LoginResponse {
	login: {
		email: string;
		name: string;
		password: string;
		token: string;
	};
}
