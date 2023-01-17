import { rest } from 'msw';

export const handlers = [
	rest.get('/api/cookies', (req, res, ctx) => {
		return res(ctx.json({ cookie: 'UserEmail' }));
	}),
];
