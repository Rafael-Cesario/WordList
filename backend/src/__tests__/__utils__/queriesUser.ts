import { server } from '../../app';
import { CREATE_USER, LOGIN, READ_USER } from './Types/queriesTypeUser';
import { ResponseType } from '../../interfaces/queriesInterface';
import { ICreateUser, ILogin } from '../../interfaces/interfacesUser';

export const readUser = async (email: string) => {
	const response = (await server.executeOperation({
		query: READ_USER,
		variables: { email },
	})) as ResponseType;

	return response;
};

export const login = async (user: {user: ILogin}) => {
	const response = (await server.executeOperation({
		query: LOGIN,
		variables: user,
	})) as ResponseType;

	return response;
};

export const createUser = async (user: ICreateUser) => {
	const response = (await server.executeOperation({
		query: CREATE_USER,
		variables: { user },
	})) as ResponseType;

	return response;
};
