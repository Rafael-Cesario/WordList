import { ServiceWordList } from '../../services/serviceWordList';
import { ICreateWordList, IGetWordLists } from '../../__tests__/utils/interfaces/interfacesWordList';

const serviceWordList = new ServiceWordList();

export const resolverWordList = {
	Query: {
		getWordLists: (parent: any, args: { getWordLists: IGetWordLists }) => serviceWordList.getWordLists(args),
	},

	Mutation: {
		createWordList: (parent: any, args: { wordList: ICreateWordList }) => serviceWordList.createWordList(args),
	},
};
