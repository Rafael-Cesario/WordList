import { GraphQLError } from 'graphql';
import { IAddWords, IGetWords, IRemoveWords } from '../interfaces/interfacesWords';
import { WordsRepository } from '../repositories/repositoryWords';

export class WordsService {
	constructor(private wordListRepository = new WordsRepository()) {}

	async addWords({ term, definition, listName, owner, status, listIndex }: IAddWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[status][listIndex].push([term, definition]);
		await this.wordListRepository.saveList({ owner, listName, list });

		return { message: 'New word added' };
	}

	async getWords({ owner, listName, listIndex, status }: IGetWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		const words = list.wordLists[status][listIndex];

		return { words };
	}

	// todo > rename word

	async removeWords({ owner, listName, listIndex, wordIndex, status }: IRemoveWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[status][listIndex].splice(wordIndex, 1);
		await this.wordListRepository.saveList({ owner, listName, list });

		return { message: 'Term and definition removed' };
	}
}
