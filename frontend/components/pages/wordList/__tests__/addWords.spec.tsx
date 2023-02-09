import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import { AddWords } from '../addWords';
import { ContextWords } from '../context/contextWords';

const addWords = vi.fn();
const removeWords = vi.fn();
const renameWords = vi.fn();

const DummyAddWords = () => {
	return (
		<ContextWords.Provider
			value={{
				words: [],
				addWords,
				removeWords,
				renameWords,
			}}>
			<AddWords />
		</ContextWords.Provider>
	);
};

describe('Add words', () => {
	test('Add words', async () => {
		render(<DummyAddWords />);

		const inputTerm = screen.getByRole('term').children[1];
		const inputDefinition = screen.getByRole('definition').children[1];
		const buttonAddWords = screen.getByRole('button', { name: 'Adicionar' });

		await act(async () => {
			await userEvent.type(inputTerm, 'MyTerm');
			await userEvent.type(inputDefinition, 'MyDefinition');
			fireEvent.click(buttonAddWords);
		});

		expect(addWords).toHaveBeenCalledWith(['MyTerm', 'MyDefinition']);
		expect(inputTerm).toHaveValue('');
		expect(inputDefinition).toHaveValue('');

		const elementWithFocus = document.activeElement;
		expect(inputTerm).toEqual(elementWithFocus);
	});
});
