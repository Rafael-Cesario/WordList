import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';
import { NewList } from '../newList';

describe('New list component', () => {
	const lists: string[] = [];
	const setLists = vi.fn();

	beforeEach(() => {
		render(<NewList props={{ lists, setLists }} />);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		cleanup();
	});

	test('Show add new list form', () => {
		const button = screen.getByTitle('Button new list');
		fireEvent.click(button);

		const newListForm = screen.getByTitle('New list');
		expect(newListForm).toBeInTheDocument();
	});

	test('Add new lists', async () => {
		const button = screen.getByTitle('Button new list');
		fireEvent.click(button);

		const input = screen.getByPlaceholderText('Nome');
		await userEvent.type(input, 'DummyList');

		const createListButton = screen.getByTitle('Create new list');
		fireEvent.click(createListButton);

		expect(setLists).toHaveBeenCalledWith(['DummyList']);
		expect(input).toHaveValue('');
	});
});
