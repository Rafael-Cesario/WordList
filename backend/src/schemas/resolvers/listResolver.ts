import { ListService } from '../../services/listService';
import { ChangesArgs, CreateListArgs, DeleteListArgs } from '../types/listType';

const listService = new ListService();

export const listResolver = {
	Query: {
		getLists: (parent: any, args: { owner: string }) => listService.getLists(args),
	},

	Mutation: {
		createList: (parent: any, args: CreateListArgs) => listService.createList(args),
		changeListName: (parent: any, args: ChangesArgs) => listService.changeListName(args),
		deleteList: (parent: any, args: DeleteListArgs) => listService.deleteList(args),
	},
};
