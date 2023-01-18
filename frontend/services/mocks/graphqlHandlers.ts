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

	graphql.mutation('CreateWordList', (req, res, ctx) => {
		const { wordList } = req.variables;
		if (!wordList.owner) throw new Error('Owner was not provided');
		return res(ctx.data({ createWordList: { message: 'Word list created' } }));
	}),

	graphql.query('ReadUser', (req, res, ctx) => {
		const { email } = req.variables;
		const user = { email: 'userEmail', name: 'userName', password: 'userPassword' };
		if (!email) throw new Error('Email was not provided');
		return res(ctx.data({ readUser: { message: 'success', user } }));
	}),

	graphql.mutation('Login', (req, res, ctx) => {
		const { user } = req.variables;
		if (!user.email) throw new Error('Email/password is wrong');
		return res(ctx.data({ login: { message: 'success', token: 'a0sdf8792ç3l4kjas0df8967123ç45lkjasd9f' } }));
	}),

	graphql.mutation('CreateUser', (req, res, ctx) => {
		const { user } = req.variables;
		if (!user.email) throw new Error('Email was not provided');
		return res(ctx.data({ createUser: { message: 'success', user } }));
	}),
];
