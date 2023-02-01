import { server } from '../../app';
import { ICreateWordList, IGetWordLists } from './interfaces/interfacesWordList';
import { ResponseType } from './interfaces/queriesInterface';
import { QueriesTypeWordList } from './Types/queriesTypeWordList';

const queriesTypeWordList = new QueriesTypeWordList();

export class QueriesWordList {
	async getWordList(getWordLists: IGetWordLists) {
		const response = (await server.executeOperation({
			query: queriesTypeWordList.GET_WORD_LISTS,
			variables: { getWordLists },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async createWordList(wordList: ICreateWordList) {
		const response = (await server.executeOperation({
			query: queriesTypeWordList.CREATE_WORD_LIST,
			variables: { wordList },
		})) as ResponseType;

		return response.body.singleResult;
	}
}
