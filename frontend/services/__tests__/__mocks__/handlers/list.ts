import { graphql } from 'msw';

export const handlers = [
	graphql.mutation('CreateList', (req, res, ctx) => {
		const { newList } = req.variables;
		if (!newList.listName || !newList.owner) throw new Error('ListName/owner was not provided');
		return res(ctx.data({ createList: { message: 'List created' } }));
	}),

	graphql.query('GetLists', (req, res, ctx) => {
		const { owner } = req.variables;
		if (!owner) throw new Error('Owner was not provided');
		return res(ctx.data({ getLists: { lists: ['list01', 'list02'] } }));
	}),

	graphql.mutation('ChangeListName', (req, res, ctx) => {
		const { changes } = req.variables;
		if (!changes.owner) throw new Error('Owner was not provided');
		return res(ctx.data({ changeListName: { message: 'list name changed' } }));
	}),

	graphql.mutation('DeleteList', (req, res, ctx) => {
		const { owner } = req.variables;
		if (!owner) throw new Error('Owner was not provided');
		return res(ctx.data({ deleteList: { message: 'list deleted' } }));
	}),
];
