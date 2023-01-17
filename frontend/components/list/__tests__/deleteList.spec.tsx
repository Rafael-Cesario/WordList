import '@testing-library/jest-dom';
import { server } from '../../../services/mocks/server';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteList } from '../deleteList';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Delete List Component', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	const listName = 'Test';

	test('Show confirm button', () => {
		render(<DeleteList props={{ listName }} />);

		const button = screen.getByRole('button', { name: 'Deletar lista' });
		fireEvent.click(button);

		expect(screen.getByText('Deletar lista Test ?')).toBeInTheDocument();
	});

	test('Delete list', () => {
		render(<DeleteList props={{ listName }} />);

		fireEvent.click(screen.getByRole('button', { name: 'Deletar lista' }));

		const deleteBTN = screen.getByRole('button', { name: 'Sim' });
		fireEvent.click(deleteBTN);
	});
});
