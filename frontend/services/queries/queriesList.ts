/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '../client';
import { ListType, WordListInput, ChangesInput, DeleteListInput } from '../../interfaces/interfaceList';
import { CHANGE_LIST_NAME, CREATE_LIST, CREATE_WORD_LIST, DELETE_LIST, GET_LISTS } from './queriesTypesList';

class QueriesList {
	async createList(newList: ListType) {
		try {
			const response = await client.mutate({
				mutation: CREATE_LIST,
				variables: { newList },
			});
			return response.data.createList;
		} catch (error: any) {
			return { error: error.message };
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

	async deleteList(deleteListArgs: DeleteListInput) {
		try {
			const response = await client.mutate({
				mutation: DELETE_LIST,
				variables: { ...deleteListArgs },
			});

			return response.data.deleteList;
		} catch (error: any) {
			return error.message;
		}
	}

	async createWordList(wordList: WordListInput) {
		try {
			const response = await client.mutate({
				mutation: CREATE_WORD_LIST,
				variables: { wordList },
			});

			return response;
		} catch (error: any) {
			return error.message;
		}
	}
}

export const queriesList = new QueriesList();
