import { LoginInterface, UserInterface } from '../interfaces/userInterface';
import { client } from './client';
import { CREATE_USER, LOGIN } from './queriesTypes';

export const createUser = async (user: UserInterface) => {
	const response = await client.mutate({
		mutation: CREATE_USER,
		variables: { user },
	});

	return response;
};

export const login = async (user: LoginInterface) => {
	const response = await client.mutate({
		mutation: LOGIN,
		variables: { user },
	});

	return response;
};
