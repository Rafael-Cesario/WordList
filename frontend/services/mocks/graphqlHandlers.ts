import { graphql } from 'msw';

export const handlers = [
	graphql.mutation('CreateList', (req, res, ctx) => {
		return res(ctx.data({ createList: { message: 'List created' } }));
	}),

	graphql.mutation('GetLists', (req, res, ctx) => {
		return res(ctx.data({ getLists: { lists: ['list01', 'list02'] } }));
	}),

	graphql.mutation('ChangeListName', (req, res, ctx) => {
		return res(ctx.data({ changeListName: { message: 'list name changed' } }));
	}),

	graphql.mutation('DeleteList', (req, res, ctx) => {
		return res(ctx.data({ deleteList: { message: 'list deleted' } }));
	}),

	graphql.mutation('CreateWordList', (req, res, ctx) => {
		return res(ctx.data({ createWordList: { message: 'Word list created' } }));
	}),
];
