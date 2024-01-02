export type CreateUserInput = {
	createUserData: {
		email: string;
		name: string;
		password: string;
	};
}

export interface CreateUserResponse {
	createUser: string;
}
