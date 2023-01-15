import { GraphQLError } from 'graphql';
import { ListModel } from '../models/listModel';
import { DeleteListArgs, ListType } from '../schemas/types/listType';

export class ListRepository {
	constructor(private listModel = ListModel) {}

	async createList(newList: ListType) {
		try {
			const response = await this.listModel.create(newList);
		} catch (error: any) {
			throw new GraphQLError('create list: ' + error.message);
		}
	}

	async findByOwner(filter: { owner: string; listName: string }) {
		try {
			const list = await this.listModel.findOne(filter);
			return list;
		} catch (error: any) {
			throw new GraphQLError('find by owner: ' + error.message);
		}
	}

	async findAllByOwner(filter: { owner: string }) {
		try {
			const lists = await this.listModel.find(filter);
			return lists;
		} catch (error: any) {
			throw new GraphQLError('find all by owner: ' + error.message);
		}
	}

	async findOneAndUpdate(filter: { owner: string; listName: string }, newValues: { listName: string }) {
		const list = await this.listModel.findOne(filter);
		if (!list) throw new GraphQLError('List not found');

		const response = await list.update(newValues);
		if (!response.acknowledged) throw new GraphQLError('Update fail');
	}

	async findOneAndDelete(filter: DeleteListArgs) {
		const list = await this.listModel.findOne(filter);
		if (!list) throw new GraphQLError('List not found');

		const response = await list.deleteOne();
		if (!response) throw new GraphQLError('List not deleted');
	}
}
