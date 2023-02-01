import { GraphQLError } from 'graphql';
import { ListRepository } from '../repositories/listRepository';
import { ICreateWordList, IGetWordLists } from '../__tests__/utils/interfaces/interfacesWordList';

export class ServiceWordList {
	constructor(private listRepository = new ListRepository()) {}

	async createWordList({ wordList }: { wordList: ICreateWordList }) {
		const { owner, listName } = wordList;

		const list = await this.listRepository.findByOwner({ owner, listName });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists.next.push([]);
		await this.listRepository.updateOne(list, { wordLists: list.wordLists });

		return { message: 'New wordList created' };
	}

	async getWordLists({ getWordLists }: { getWordLists: IGetWordLists }) {
		const { listName, owner } = getWordLists;

		const getList = await this.listRepository.findByOwner({ owner, listName });
		if (!getList) throw new GraphQLError('List not found');

		return {
			owner: getList.owner,
			listName: getList.listName,
			wordLists: getList.wordLists,
		};
	}

	// deleteWordList
}
