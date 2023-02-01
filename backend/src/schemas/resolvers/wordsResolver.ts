import { WordsService } from '../../services/serviceWords';
import { IAddWords, IGetWords, IRemoveWords } from '../../interfaces/wordsInterface';

const wordsService = new WordsService();

export const wordsResolver = {
	Query: {
		getWords: (parent: any, { words }: { words: IGetWords }) => wordsService.getWords(words),
	},

	Mutation: {
		addWords: (parent: any, { words }: { words: IAddWords }) => wordsService.addWords(words),
		removeWords: (parent: any, { words }: { words: IRemoveWords }) => wordsService.removeWords(words),
	},
};
