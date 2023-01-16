/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListType } from '../../interfaces/interfaceList';
import { client } from '../client';
import { ChangesInput, CHANGE_LIST_NAME, CREATE_LIST, GET_LISTS } from './queriesTypesList';

class QueriesList {
	async createList(newList: ListType) {
		try {
			const response = await client.mutate({
				mutation: CREATE_LIST,
				variables: { newList },
			});
			return response;
		} catch (error: any) {
			return error.message;
		}
	}

	async getLists(owner: string) {
		try {
			const response = await client.query({
				query: GET_LISTS,
				variables: { owner },
			});
			return response.data.getLists.lists;
		} catch (error: any) {
			return error.message;
		}
	}

	async changeListName(changes: ChangesInput) {
		try {
			const response = await client.mutate({
				mutation: CHANGE_LIST_NAME,
				variables: { changes },
			});

			return response.data.changeListName;
		} catch (error: any) {
			return error.message;
		}
	}
}

export const queriesList = new QueriesList();
