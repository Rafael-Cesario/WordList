import { IAddWords } from "../../interfaces/word";
import { ServiceWord } from "../../services/word";

const serviceWord = new ServiceWord();

export const resolverWord = {
	Mutation: {
		addWords: (parent: never, data: IAddWords) => serviceWord.addWords(data),
	},
};