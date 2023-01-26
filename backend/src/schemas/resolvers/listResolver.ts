import { ListService } from '../../services/listService';
import { ChangesArgs, CreateListArgs, DeleteListArgs, GetWordListsArgs, WordListArgs } from '../../interfaces/listInterface';

const listService = new ListService();

// todo > move wordLists resolvers to another file

export const listResolver = {
	Query: {
		getLists: (parent: any, args: { owner: string }) => listService.getLists(args),
		getWordLists: (parent: any, args: GetWordListsArgs) => listService.getWordLists(args),
	},

	Mutation: {
		createList: (parent: any, args: CreateListArgs) => listService.createList(args),
		changeListName: (parent: any, args: ChangesArgs) => listService.changeListName(args),
		deleteList: (parent: any, args: DeleteListArgs) => listService.deleteList(args),
		createWordList: (parent: any, args: WordListArgs) => listService.createWordList(args),
	},
};
