import { UserInterface } from '../interfaces/userInterface';
import { client } from './client';
import { CREATE_USER } from './queriesTypes';

export const createUser = async (user: UserInterface) => {
	const response = await client.mutate({
		mutation: CREATE_USER,
		variables: { user },
	});

	return response;
};
