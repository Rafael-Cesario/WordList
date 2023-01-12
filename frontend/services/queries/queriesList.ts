/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListType } from '../../interfaces/interfaceList';
import { client } from '../client';
import { CREATE_LIST } from './queriesTypesList';

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
