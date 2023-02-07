/* eslint-disable @typescript-eslint/no-explicit-any */

import { IAddWords, IGetWords, IRemoveWords, IRenameWords } from '../../interfaces/interfaceWords';
import { client } from '../client';
import { QueriesTypeWords } from './types/queriesTypeWords';

const queriesTypeWords = new QueriesTypeWords();

export class QueriesWords {
	async addWords({ words }: { words: IAddWords }) {
		try {
			const response = await client.mutate({ mutation: queriesTypeWords.ADD_WORDS, variables: { words } });
			return response.data.addWords;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async getWords({ words }: { words: IGetWords }) {
		try {
			const response = await client.query({ query: queriesTypeWords.GET_WORDS, variables: { words } });
			return response.data.getWords;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async renameWords({ words }: { words: IRenameWords }) {
		try {
			const response = await client.mutate({ mutation: queriesTypeWords.RENAME_WORDS, variables: { words } });
			return response.data.renameWords;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async removeWords({ words }: { words: IRemoveWords }) {
		try {
			const response = await client.mutate({ mutation: queriesTypeWords.REMOVE_WORDS, variables: { words } });
			return response.data.removeWords;
		} catch (error: any) {
			return { error: error.message };
		}
	}
}
