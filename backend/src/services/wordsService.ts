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

export class WordsService {
	constructor(private wordListRepository = new WordsRepository()) {}

	async addWords({ term, definition, listName, owner, status, listIndex }: IAddWords) {
		const list = await this.wordListRepository.getList({ listName, owner });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists[status][listIndex].push([term, definition]);
		await this.wordListRepository.saveList({ owner, listName, status, list });

		return { message: 'New word added' };
	}

	// update
	// delete
}
