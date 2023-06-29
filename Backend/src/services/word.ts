import mongoose from "mongoose";
import { IAddWords, IRemoveWord, IUpdateWords } from "../interfaces/word";
import { ListModel } from "../models/list";
import { GraphQLError } from "graphql";

export class ServiceWord {
	async addWords({ addWords }: IAddWords) {
		const { listID, words } = addWords;

		const list = await ListModel.findOne({ _id: new mongoose.Types.ObjectId(listID) });
		if (!list) throw new GraphQLError("notFound: List not found");

		words.forEach((word) => {
			if (!word.term) throw new GraphQLError("emtpyWord: Term can't be empty");
			if (!word.definitions) throw new GraphQLError("emtpyWord: Definitions can't be empty");
			if (word.learned) word.learned = false;
			if (word.correctTimes > 0) word.correctTimes = 0;

			list.words.forEach((wordInList) => {
				const alreadyExist = wordInList.term === word.term;
				if (alreadyExist) throw new GraphQLError(`duplicated: ${word.term} : already was added`);
			});
		});

		list.words.push(...words);
		await list.save();

		return { message: `New words added: ${words.length}` };
	}

	async removeWord({ removeWord }: IRemoveWord) {
		const { listID, wordIndex } = removeWord;

		const list = await ListModel.findOne({ _id: new mongoose.Types.ObjectId(listID) });
		if (!list) throw new GraphQLError("notFound: List not found");

		const [removedWord] = list.words.splice(wordIndex, 1);
		if (!removedWord) throw new GraphQLError("notFound: Word not found");

		await list.save();
		return { message: `success: Word "${removedWord.term}" was removed.` };
	}

	async updateWords({ updateWords }: IUpdateWords) {
		const { listID, firstWordIndex, updatedWords } = updateWords;

		if (!updatedWords.length) throw new GraphQLError("emptyValues: There is no words to update.");

		const list = await ListModel.findOne({ _id: new mongoose.Types.ObjectId(listID) });
		if (!list) throw new GraphQLError("notFound: List not found");
		if (firstWordIndex > list.words.length - 1) throw new GraphQLError("notFound: Word index is out of bound.");

		list.words.splice(firstWordIndex, updatedWords.length, ...updatedWords);
		await list.save();

		return { message: `success: ${updatedWords.length} updated ${updatedWords.length === 1 ? "word" : "words"}.` };
	}
}
