import { ListService } from '../../services/listService';
import { CreateListArgs } from '../types/listType';

const listService = new ListService();

export const listResolver = {
	Mutation: {
		createList:(parent: any, args: CreateListArgs) => listService.createList(args),
	},
};
