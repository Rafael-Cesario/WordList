import { IAddWords, IRemoveWords, WordsService } from '../../services/wordsService';

const wordsService = new WordsService();

export const wordsResolver = {
	Mutation: {
		addWords: (parent: any, { words }: { words: IAddWords }) => wordsService.addWords(words),
		removeWords: (parent: any, { words }: { words: IRemoveWords }) => wordsService.removeWords(words),
	},
};
