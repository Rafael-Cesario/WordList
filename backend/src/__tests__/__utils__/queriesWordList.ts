import { server } from '../../app';
import { IChangeWordListStatus, ICreateWordList, IDeleteWordList, IGetWordLists } from '../../interfaces/interfacesWordList';
import { ResponseType } from '../../interfaces/queriesInterface';
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

	async deleteWordList(deleteWordList: IDeleteWordList) {
		const response = (await server.executeOperation({
			query: queriesTypeWordList.DELETE_WORDLIST,
			variables: { deleteWordList },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async changeWordListStatus(changeWordListStatus: IChangeWordListStatus) {
		const response = (await server.executeOperation({
			query: queriesTypeWordList.CHANGE_WORDLIST_STATUS,
			variables: { changeWordListStatus },
		})) as ResponseType;

		return response.body.singleResult;
	}
}
