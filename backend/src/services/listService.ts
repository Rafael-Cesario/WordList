import { ListRepository } from '../repositories/listRepository';
import { CreateListArgs, CreateListResponse } from '../schemas/types/listType';

export class ListService {
	constructor(private listRepository = new ListRepository()) {}

	async createList(args: CreateListArgs): Promise<CreateListResponse> {
		const { newList } = args;
		await this.listRepository.createList({ ...newList, wordLists: [] });

		return { message: 'New list created' };
	}
}
