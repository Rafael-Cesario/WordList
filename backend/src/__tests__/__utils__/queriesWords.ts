import { server } from '../../app';
import { IAddWords, IGetWords, IRemoveWords, IRenameWords } from '../../interfaces/interfacesWords';
import { ResponseType } from '../../interfaces/queriesInterface';
import { QueriesTypeWords } from './Types/queriesTypeWords';

const queriesTypeWords = new QueriesTypeWords();

export class QueriesWords {
	async getWords(words: IGetWords) {
		const response = (await server.executeOperation({
			query: queriesTypeWords.GET_WORDS,
			variables: { words },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async addWords(words: IAddWords) {
		const response = (await server.executeOperation({
			query: queriesTypeWords.ADD_WORDS,
			variables: { words },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async removeWords(words: IRemoveWords) {
		const response = (await server.executeOperation({
			query: queriesTypeWords.REMOVE_WORDS,
			variables: { words },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async renameWords(words: IRenameWords) {
		const response = (await server.executeOperation({
			query: queriesTypeWords.RENAME_WORDS,
			variables: { words },
		})) as ResponseType;

		return response.body.singleResult;
	}
}
