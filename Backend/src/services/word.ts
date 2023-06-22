import mongoose from "mongoose";
import { IAddWords } from "../interfaces/word";
import { ListModel } from "../models/list";
import { GraphQLError } from "graphql";

export class ServiceWord {
	async addWords({ addWords }: IAddWords) {
		const { listID, words } = addWords;

		const list = await ListModel.findOne({ _id: new mongoose.Types.ObjectId(listID) });
		if (!list) throw new GraphQLError("notFound: List not found");

		words.forEach((word) => {
			if (!word.term) throw new GraphQLError("emtpyWord: Term can't be emtpy");
			if (!word.definitions) throw new GraphQLError("emtpyWord: Definitions can't be empty");
			if (word.learned) word.learned = false;
			if (word.correctTimes > 0) word.correctTimes = 0;

			list.words.forEach((wordInList) => {
				const alreadyExist = wordInList.term === word.term;
				if (alreadyExist) throw new GraphQLError("duplicated: This term already exist");
			});
		});

		list.words.push(...words);
		await list.save();

		return { message: `New words added: ${words.length} ${words.length === 1 ? "word" : "words"}.` };
	}
}
