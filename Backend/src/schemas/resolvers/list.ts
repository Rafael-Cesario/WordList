import { IReadLists } from "../../interfaces/list";
import { ServiceList } from "../../services/list";

const serviceList = new ServiceList();

export const resolverList = {
	Query: {
		readLists: (parent: never, data: IReadLists) => serviceList.readLists(data),
	},
};
