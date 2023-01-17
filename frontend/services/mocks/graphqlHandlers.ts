import { graphql } from 'msw';

export const handlers = [
	graphql.mutation('DeleteList', (req, res, ctx) => {
		return res(
			ctx.data({
				deleteList: {
					message: 'list deleted',
				},
			})
		);
	}),
];
