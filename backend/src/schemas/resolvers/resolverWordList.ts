import { ServiceWordList } from '../../services/serviceWordList';
import { IChangeWordListStatus, ICreateWordList, IDeleteWordList, IGetWordLists } from '../../interfaces/interfacesWordList';

const serviceWordList = new ServiceWordList();

export const resolverWordList = {
	Query: {
		getWordLists: (parent: any, args: { getWordLists: IGetWordLists }) => serviceWordList.getWordLists(args),
	},

	Mutation: {
		createWordList: (parent: any, args: { wordList: ICreateWordList }) => serviceWordList.createWordList(args),
		deleteWordList: (parent: any, args: { deleteWordList: IDeleteWordList }) => serviceWordList.deleteWordList(args),
		changeWordListStatus: (parent: any, args: { changeWordListStatus: IChangeWordListStatus }) => serviceWordList.changeWordListStatus(args),
	},
};
