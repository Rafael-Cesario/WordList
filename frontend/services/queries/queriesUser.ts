/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginInterface, ResponseInterface, UserInterface } from '../../interfaces/interfaceUser';
import { client } from '../client';
import { CREATE_USER, LOGIN } from './queriesTypesUser';

export const createUser = async (user: UserInterface) => {
	const response = await client.mutate({
		mutation: CREATE_USER,
		variables: { user },
	});

	return response;
};

export const login = async (user: LoginInterface): Promise<ResponseInterface> => {
	try {
		const response = await client.mutate({
			mutation: LOGIN,
			variables: { user },
		});

		return response;
	} catch (error: any) {
		if (error.message.startsWith('Email')) return { error: ['email: Email ou senha incorreta', 'password: Email ou senha incorreta'] };
		return { error: error.message };
	}
};
