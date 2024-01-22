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

interface LoginInput {
	loginData: {
		email: string;
		password: string;
	};
}

interface LoginResponse {
	login: {
		id: string;
		email: string;
		name: string;
		token: string;
	};
}
