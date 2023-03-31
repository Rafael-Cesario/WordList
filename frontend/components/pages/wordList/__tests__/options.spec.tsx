import { fireEvent, render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import { QueriesWords } from '../../../../services/queries/queriesWords';
import { Options } from '../options';

vi.mock('../../../../utils/hooks/useQueriesWords');
vi.mock('../../../../services/queries/queriesWords');
vi.mock('../../../../utils/hooks/useLocalData');

describe('Options', () => {
	const queriesWords = new QueriesWords();

	it('Rename words', () => {
		render(<Options props={{ index: 0, values: { definition: 'definition', term: 'term' } }} />);
		const renameBtn = screen.getByRole('options').children[0];
		fireEvent.click(renameBtn);
		expect(queriesWords.renameWords).toHaveBeenCalledWith({
			words: {
				listIndex: '0',
				listName: 'List01',
				listStatus: 'next',
				newWords: ['term', 'definition'],
				owner: 'user',
				wordIndex: '0',
			},
		});
	});

	it('save the same words if input is empty', () => {
		render(<Options props={{ index: 0, values: { definition: '', term: '' } }} />);
		const renameBtn = screen.getByRole('options').children[0];
		fireEvent.click(renameBtn);
		expect(queriesWords.renameWords).toHaveBeenCalledWith({
			words: {
				listIndex: '0',
				listName: 'List01',
				listStatus: 'next',
				newWords: ['word', 'word'],
				owner: 'user',
				wordIndex: '0',
			},
		});
	});

	it('Delete Words', () => {
		render(<Options props={{ index: 0, values: { definition: '', term: '' } }} />);
		const deleteBtn = screen.getByRole('options').children[1];
		fireEvent.click(deleteBtn);
		expect(queriesWords.removeWords).toHaveBeenCalledWith({
			words: {
				listIndex: '0',
				listName: 'List01',
				status: 'next',
				owner: 'user',
				wordIndex: '0',
			},
		});
	});
});
