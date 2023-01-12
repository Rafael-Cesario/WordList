import { ListService } from '../../services/listService';
import { CreateListArgs } from '../types/listType';

const listService = new ListService();

export const listResolver = {
	Query: {
		getLists:(parent:any, args: {owner: string}) => listService.getLists(args)

	},

	Mutation: {
		createList:(parent: any, args: CreateListArgs) => listService.createList(args),
	},
};
