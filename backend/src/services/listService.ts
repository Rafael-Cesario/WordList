import { GraphQLError } from 'graphql';
import { ListRepository } from '../repositories/listRepository';
import { CreateListArgs, CreateListResponse } from '../schemas/types/listType';

export class ListService {
	constructor(private listRepository = new ListRepository()) {}

	async createList(args: CreateListArgs): Promise<CreateListResponse> {
		const { newList } = args;

		const list = await this.listRepository.findByOwner(newList.owner, newList.listName);
		if (list) throw new GraphQLError('create list: A list with the same name already exist');

		await this.listRepository.createList({ ...newList, wordLists: [] });

		return { message: 'New list created' };
	}
}
