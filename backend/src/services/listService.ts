import { GraphQLError } from 'graphql';
import { ListRepository } from '../repositories/listRepository';
import { ChangesArgs, CreateListArgs, DeleteListArgs, GetWordListsArgs, MessageResponse, WordListArgs } from '../interfaces/listInterface';

export class ListService {
	constructor(private listRepository = new ListRepository()) {}

	async createList({ newList }: CreateListArgs): Promise<MessageResponse> {
		const { owner, listName } = newList;

		const list = await this.listRepository.findByOwner({ owner, listName });
		if (list) throw new GraphQLError('create list: A list with the same name already exist');

		await this.listRepository.createList({ ...newList, wordLists: { next: [], current: [], done: [] } });

		return { message: 'New list created' };
	}

	async getLists({ owner }: { owner: string }) {
		const lists = await this.listRepository.findAllByOwner({ owner });
		const listNames = lists.map(list => list.listName);
		return { lists: listNames };
	}

	async changeListName({ changes }: ChangesArgs) {
		const { owner, oldName, newName } = changes;

		const filter = { owner, listName: oldName };
		const newValues = { listName: newName };
		await this.listRepository.findOneAndUpdate(filter, newValues);

		return { message: 'list updated' };
	}

	async deleteList(deleteFilter: DeleteListArgs) {
		await this.listRepository.findOneAndDelete(deleteFilter);

		return { message: 'List deleted' };
	}

	async createWordList({ wordList }: WordListArgs) {
		const { owner, listName } = wordList;

		const list = await this.listRepository.findByOwner({ owner, listName });
		if (!list) throw new GraphQLError('List not found');

		list.wordLists.next.push([]);
		await this.listRepository.updateOne(list, { wordLists: list.wordLists });

		return { message: 'New Word List created' };
	}

	async getWordLists({ getWordLists }: GetWordListsArgs) {
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
