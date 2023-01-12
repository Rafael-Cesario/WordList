/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListType } from '../../interfaces/interfaceList';
import { client } from '../client';
import { CREATE_LIST, GET_LISTS } from './queriesTypesList';

export const createList = async (newList: ListType) => {
	try {
		const response = await client.mutate({
			mutation: CREATE_LIST,
			variables: { newList },
		});
		return response;
	} catch (error: any) {
		return error.message;
	}
};

export const getLists = async (owner: string) => {
	try {
		const response = await client.query({
			query: GET_LISTS,
			variables: { owner },
		});
		return response.data.getLists.lists;
	} catch (error: any) {
		return error.message;
	}
};
