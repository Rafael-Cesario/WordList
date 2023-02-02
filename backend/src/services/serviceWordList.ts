import { GraphQLError } from 'graphql';
import { ListRepository } from '../repositories/listRepository';
import { ICreateWordList, IDeleteWordList, IGetWordLists } from '../interfaces/interfacesWordList';

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

	async deleteWordList({ deleteWordList }: { deleteWordList: IDeleteWordList }) {
		const { owner, listName, wordListIndex, wordListStatus } = deleteWordList;

		const getList = await this.listRepository.findByOwner({ owner, listName });
		if (!getList) throw new GraphQLError('List not found');

		const wordLists = getList.wordLists[wordListStatus];
		wordLists.splice(wordListIndex, 1);

		await this.listRepository.updateOne(getList, { wordLists: getList.wordLists });
		return { message: 'WordList deleted' };
	}

	// todo > change wordList status
}
