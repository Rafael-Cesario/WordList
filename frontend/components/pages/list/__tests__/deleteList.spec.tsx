import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteList } from '../deleteList';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Delete List Component', () => {
	const listName = 'Test';

	test('Show confirm button', () => {
		render(<DeleteList props={{ listName }} />);

		const button = screen.getByRole('button', { name: 'Deletar lista' });
		fireEvent.click(button);

		expect(screen.getByText('Deletar lista Test ?')).toBeInTheDocument();
	});
});
