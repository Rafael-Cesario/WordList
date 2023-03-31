import { GraphQLError } from 'graphql';
import { IAddWords, IGetWords, IRemoveWords, IRenameWords } from '../interfaces/interfacesWords';
import { WordsRepository } from '../repositories/repositoryWords';

export class WordsService {
	constructor(private wordListRepository = new WordsRepository()) {}

	async addWords({ term, definition, listName, owner, status, listIndex }: IAddWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[status][Number(listIndex)].push([term, definition]);
		await this.wordListRepository.saveList({ owner, listName, list });

		return { message: 'New word added' };
	}

	async getWords({ owner, listName, listIndex, status }: IGetWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		const words = list.wordLists[status][Number(listIndex)];

		return { words };
	}

	async renameWords({ owner, listName, listStatus, listIndex, wordIndex, newWords }: IRenameWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[listStatus][Number(listIndex)][Number(wordIndex)] = newWords;
		await this.wordListRepository.saveList({ owner, listName, list });

		return { message: 'Words updated' };
	}

	async removeWords({ owner, listName, listIndex, wordIndex, status }: IRemoveWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[status][Number(listIndex)].splice(Number(wordIndex), 1);
		await this.wordListRepository.saveList({ owner, listName, list });

		return { message: 'Term and definition removed' };
	}
}
