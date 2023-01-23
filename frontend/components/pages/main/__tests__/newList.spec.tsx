import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { NewList } from '../newList';

describe('New list component', () => {
	const lists: string[] = [];
	const setLists = vi.fn();

	beforeAll(() => render(<NewList props={{ lists, setLists }} />));
	afterEach(() => cleanup());

	test('Show add new list form', () => {
		const button = screen.getByTitle('Button new list');
		fireEvent.click(button);

		const newListForm = screen.getByTitle('New list');
		expect(newListForm).toBeInTheDocument();
	});
});
