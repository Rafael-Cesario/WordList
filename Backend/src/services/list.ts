import { ICreateList, IDeleteList, IReadLists, IRenameList } from "../interfaces/list";
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

	async renameList({ renameList }: IRenameList) {
		const emptyValues = checkData(renameList);
		if (emptyValues) throw new GraphQLError(emptyValues);

		const { ID, userID, newName } = renameList;
		const alreadyHasList = await ListModel.findOne({ userID: userID, name: newName });
		if (alreadyHasList) throw new GraphQLError("duplicated: A list with the same name already exist");

		const list = await ListModel.findOneAndUpdate({ _id: ID, userID }, { name: newName }, { new: true });
		if (!list) throw new GraphQLError("notFound: List not found");

		return { list };
	}

	async deleteList({ deleteList }: IDeleteList) {
		const emptyValues = checkData(deleteList);
		if (emptyValues) throw new GraphQLError(emptyValues);

		const { ID, userID } = deleteList;

		const list = await ListModel.findOneAndDelete({ _id: ID, userID });
		if (!list) throw new GraphQLError("notFound: List not found");

		return { message: "Deleted" };
	}
}
