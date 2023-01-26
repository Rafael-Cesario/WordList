import { GraphQLError } from 'graphql';
import { WordsRepository } from '../repositories/wordListRepository';

export interface IAddWords {
	term: string;
	definition: string;
	listName: string;
	owner: string;
	listIndex: number;
	status: 'next' | 'current' | 'done';
}

export interface IRemoveWords {
	owner: string;
	listName: string;
	listIndex: number;
	wordIndex: number;
	status: 'next' | 'current' | 'done';
}

export class WordsService {
	constructor(private wordListRepository = new WordsRepository()) {}

	async addWords({ term, definition, listName, owner, status, listIndex }: IAddWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[status][listIndex].push([term, definition]);
		await this.wordListRepository.saveList({ owner, listName, list });

		return { message: 'New word added' };
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
