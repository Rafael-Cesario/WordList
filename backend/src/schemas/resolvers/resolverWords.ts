import { WordsService } from '../../services/serviceWords';
import { IAddWords, IGetWords, IRemoveWords, IRenameWords } from '../../interfaces/interfacesWords';

const wordsService = new WordsService();

export const wordsResolver = {
	Query: {
		getWords: (parent: any, { words }: { words: IGetWords }) => wordsService.getWords(words),
	},

	Mutation: {
		addWords: (parent: any, { words }: { words: IAddWords }) => wordsService.addWords(words),
		removeWords: (parent: any, { words }: { words: IRemoveWords }) => wordsService.removeWords(words),
		renameWords: (parent: any, {words}: {words: IRenameWords}) => wordsService.renameWords(words),
	},
};
