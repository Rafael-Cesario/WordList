import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteList } from '../deleteList';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/dist/client/router', () => require('next-router-mock'));

const handlers = [
	graphql.mutation('deleteList', (req, res, ctx) => {
		console.log({ req: req.variables });

		return res(
			ctx.data({
				deleteList: {
					message: 'list deleted - test environment',
				},
			})
		);
	}),
];

const server = setupServer(...handlers);

describe('Delete List Component', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('Show confirm button', () => {
		const listName = 'Test';
		render(<DeleteList props={{ listName }} />);

		const button = screen.getByRole('button', { name: 'Deletar lista' });
		fireEvent.click(button);

		expect(screen.getByText('Deletar lista Test ?')).toBeInTheDocument();
	});
});
