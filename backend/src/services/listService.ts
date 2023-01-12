import { CreateListArgs, CreateListResponse } from '../schemas/types/listType';

export class ListService {
	async createList(args: CreateListArgs): Promise<CreateListResponse> {
		const { newList } = args;
		console.log({ newList });

		return { message: 'New list created' };
	}
}
