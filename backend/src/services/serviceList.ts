import { GraphQLError } from 'graphql';
import { IChangeListName, ICreateList, IDeleteList } from '../interfaces/interfacesList';
import { ListRepository } from '../repositories/listRepository';

export class ListService {
	constructor(private listRepository = new ListRepository()) {}

	async createList({ newList }: { newList: ICreateList }) {
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

	async changeListName({ changes }: { changes: IChangeListName }) {
		const { owner, oldName, newName } = changes;

		const filter = { owner, listName: oldName };
		const newValues = { listName: newName };
		await this.listRepository.findOneAndUpdate(filter, newValues);

		return { message: 'list updated' };
	}

	async deleteList(deleteFilter: IDeleteList) {
		await this.listRepository.findOneAndDelete(deleteFilter);

		return { message: 'List deleted' };
	}
}
