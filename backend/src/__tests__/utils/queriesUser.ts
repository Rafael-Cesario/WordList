import { server } from '../../app';
import { LoginArgs, UserType } from '../../schemas/types/userType';
import { CREATE_USER, LOGIN, READ_USER } from './Types/queriesTypeUser';
import { ResponseType } from './interfaces/queriesInterface';

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
