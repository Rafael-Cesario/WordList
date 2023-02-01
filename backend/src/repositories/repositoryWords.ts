import { GraphQLError } from 'graphql';
import { IGetList, ISaveList } from '../interfaces/interfacesWords';
import { ListModel } from '../models/listModel';

export class WordsRepository {
	async getList({ owner, listName }: IGetList) {
		try {
			const list = await ListModel.findOne({ owner, listName });
			return list;
		} catch (error: any) {
			throw new GraphQLError('getList: ' + error.message);
		}
	}

	async saveList({ owner, listName, list }: ISaveList) {
		try {
			await ListModel.findOneAndUpdate({ owner, listName }, { ...list });
		} catch (error: any) {
			throw new GraphQLError('saveList: ' + error.message);
		}
	}
}
