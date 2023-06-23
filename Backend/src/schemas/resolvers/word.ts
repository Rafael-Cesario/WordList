import { IAddWords, IRemoveWord, IUpdateWords } from "../../interfaces/word";
import { ServiceWord } from "../../services/word";

const serviceWord = new ServiceWord();

export const resolverWord = {
	Mutation: {
		addWords: (parent: never, data: IAddWords) => serviceWord.addWords(data),
		removeWord: (parent: never, data: IRemoveWord) => serviceWord.removeWord(data),
		updateWords: (parent: never, data: IUpdateWords) => serviceWord.updateWords(data),
	},
};
