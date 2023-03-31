import { rest } from 'msw';

export const handlers = [
	rest.get('/api/cookies', (req, res, ctx) => {
		return res(ctx.json({ cookie: 'UserEmail' }));
	}),

	rest.post('/api/cookies', (req, res, ctx) => {
		return res(ctx.json({ message: 'Cookie set' }));
	}),

	rest.delete('/api/cookies', (req, res, ctx) => {
		return res(ctx.json({ message: 'Cookie deleted' }));
	}),
];
