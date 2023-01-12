import { GraphQLError } from 'graphql';
import { ListModel } from '../models/listModel';
import { ListType } from '../schemas/types/listType';

export class ListRepository {
	constructor(private listModel = ListModel) {}

	async createList(newList: ListType) {
		try {
			const response = await this.listModel.create(newList);
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
