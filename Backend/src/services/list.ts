import { ICreateList, IReadLists } from "../interfaces/list";
import { ListModel } from "../models/list";
import { checkData } from "../utils/checkData";
import { GraphQLError } from "graphql";
import { UserModel } from "../models/user";

export class ServiceList {
	async readLists({ userID }: IReadLists) {
		const lists = await ListModel.find({ userID });
		if (lists.length) return lists;

		const user = await UserModel.findOne({ _id: userID });
		if (!user) throw new GraphQLError("User not found");

		return [];
	}

	async createList({ createList }: ICreateList) {
		const { name, userID } = createList;

		const emptyValues = checkData(createList);
		if (emptyValues) throw new GraphQLError(emptyValues);

		const user = await UserModel.findOne({ _id: userID });
		if (!user) throw new GraphQLError("User not found");

		const list = await ListModel.findOne({ name });
		if (list) throw new GraphQLError("Duplicated: A list with the same name already exist");

		const newList = await ListModel.create({ name, userID });
		return { list: { _id: newList._id, userID, name } };
	}
}
