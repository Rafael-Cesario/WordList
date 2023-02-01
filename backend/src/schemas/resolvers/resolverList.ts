import { IGetLists, ICreateList, IChangeListName, IDeleteList } from '../../interfaces/interfacesList';
import { ListService } from '../../services/serviceList';

const listService = new ListService();

export const listResolver = {
	Query: {
		getLists: (parent: any, args: IGetLists) => listService.getLists(args),
	},

	Mutation: {
		createList: (parent: any, args: { newList: ICreateList }) => listService.createList(args),
		changeListName: (parent: any, args: { changes: IChangeListName }) => listService.changeListName(args),
		deleteList: (parent: any, args: IDeleteList) => listService.deleteList(args),
	},
};
