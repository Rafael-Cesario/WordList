import { GraphQLError } from 'graphql';
import { ListRepository } from '../repositories/listRepository';
import { CreateListArgs, CreateListResponse } from '../schemas/types/listType';

export class ListService {
	constructor(private listRepository = new ListRepository()) {}

	async createList({ newList }: CreateListArgs): Promise<CreateListResponse> {
		const { owner, listName } = newList;

		const list = await this.listRepository.findByOwner({ owner, listName });
		if (list) throw new GraphQLError('create list: A list with the same name already exist');

		await this.listRepository.createList({ ...newList, wordLists: [] });

		return { message: 'New list created' };
	}

	async getLists({ owner }: { owner: string }) {
		const lists = await this.listRepository.findAllByOwner({ owner });
		const listNames = lists.map(list => list.listName);
		return { lists: listNames };
	}
}
