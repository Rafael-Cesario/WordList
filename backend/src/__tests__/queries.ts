import { server } from '../app';
import { LoginArgs, UserType } from '../schemas/types/userType';

interface ResponseType {
	body: {
		singleResult: {
			data: { [key: string]: any };
			errors?: {};
		};
	};
}

const READ_USER = `#graphql
	query ReadUser ($email: String!) {
		readUser ( email : $email ) {
			message,
			user {
				email, name, password
			}
		}
	}
`;

const LOGIN = `#graphql
	mutation Login ($user:LoginInput!) {
		login (user: $user ) {
			message, token
		}
	}
`;

const CREATE_USER = `#graphql
	mutation CreateUser ($user: UserInput! ) {
		createUser (user: $user) {
			message,
			user {
				email, name, password
			}
		}
	}
`;

export const readUser = async (email: string) => {
	const response = (await server.executeOperation({
		query: READ_USER,
		variables: { email },
	})) as ResponseType;

	return response;
};

export const login = async (user: LoginArgs) => {
	const response = (await server.executeOperation({
		query: LOGIN,
		variables: user,
	})) as ResponseType;

	return response;
};

export const createUser = async (user: UserType) => {
	const response = (await server.executeOperation({
		query: CREATE_USER,
		variables: { user },
	})) as ResponseType;

	return response;
};
