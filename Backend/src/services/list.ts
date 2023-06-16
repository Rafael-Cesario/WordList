import mongoose from "mongoose";
import { ICreateList, IReadLists } from "../interfaces/list";
import { ListModel } from "../models/list";
import { checkData } from "../utils/checkData";
import { GraphQLError } from "graphql";
import { UserModel } from "../models/user";

export class ServiceList {
	async readLists({ userID }: IReadLists) {
		const lists = await ListModel.find({ userID: new mongoose.Types.ObjectId(userID) });
		if (lists) return lists;

		const user = await UserModel.findOne({ _id: new mongoose.Types.ObjectId(userID) });
		if (!user) throw new GraphQLError("User not found");

		return [];
	}

	async createList({ createList }: ICreateList) {
		const emptyValues = checkData(createList);
		if (emptyValues) throw new GraphQLError(emptyValues);

		const { name, userID } = createList;

		const user = await UserModel.findOne({ _id: new mongoose.Types.ObjectId(userID) });
	}
}
