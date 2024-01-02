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
