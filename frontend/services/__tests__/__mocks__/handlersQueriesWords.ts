import { graphql } from 'msw';
import { IAddWords, IGetWords, IRemoveWords, IRenameWords } from '../../../interfaces/interfaceWords';

export const handlersQueriesWords = [
	graphql.query('GetWords', (req, res, ctx) => {
		const { listName } = req.variables as IGetWords;
		if (!listName) throw new Error('ListName was not provided');
		return res(ctx.data({ getWords: [['word01', 'word0101']] }));
	}),

	graphql.mutation('AddWords', (req, res, ctx) => {
		const { listName } = req.variables as IAddWords;
		if (!listName) throw new Error('ListName was not provided');
		return res(ctx.data({ addWords: { message: 'New word added' } }));
	}),

	graphql.mutation('RemoveWords', (req, res, ctx) => {
		const { listName } = req.variables as IRemoveWords;
		if (!listName) throw new Error('ListName was not provided');
		return res(ctx.data({ removeWords: { message: 'Word removed' } }));
	}),

	graphql.mutation('RenameWords', (req, res, ctx) => {
		const { listName } = req.variables as IRenameWords;
		if (!listName) throw new Error('ListName was not provided');
		return res(ctx.data({ renameWords: { message: 'Word updated' } }));
	}),
];
