interface CreateUserInput {
	createUserData: {
		email: string;
		name: string;
		password: string;
	};
}

interface CreateUserResponse {
	createUser: string;
}
