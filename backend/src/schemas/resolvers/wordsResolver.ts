import { IAddWords, WordsService } from '../../services/wordsService';

const wordsService = new WordsService();

export const wordsResolver = {
	Mutation: {
		addWords: (parent: any, { words }: { words: IAddWords }) => wordsService.addWords(words),
	},
};
