import { ICreateList, IDeleteList, IGetOneList, IReadLists, IRenameList, IUpdateConfigs } from "../../interfaces/list";
import { ServiceList } from "../../services/list";

const serviceList = new ServiceList();

export const resolverList = {
	Query: {
		readLists: (parent: never, data: IReadLists) => serviceList.readLists(data),
		getOneList: (parent:never, data: IGetOneList) => serviceList.getOneList(data),
	},

	Mutation: {
		createList: (parent: never, data: ICreateList) => serviceList.createList(data),
		renameList: (parent: never, data: IRenameList) => serviceList.renameList(data),
		deleteList: (parent: never, data: IDeleteList) => serviceList.deleteList(data),
		updateConfigs: (parent: never, data: IUpdateConfigs) => serviceList.updateConfigs(data),
	},
};
