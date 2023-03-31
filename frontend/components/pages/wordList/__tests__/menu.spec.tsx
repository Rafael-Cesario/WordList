import { QueriesWordList } from '../../../../services/queries/queriesWordList';
import { describe, vi } from 'vitest';
import { Menu } from '../menu';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('../../../../services/queries/queriesWordList');
vi.mock('../../../../utils/hooks/useQueriesWords');
vi.mock('../../../../utils/hooks/useQueriesWordList');
vi.mock('../../../../utils/hooks/useLocalData');

vi.mock('next/router', () => ({
	useRouter: () => ({
		reload: vi.fn(),
	}),
}));

vi.mock('next/router', () => ({
	useRouter: () => ({
		query: { listName: 'list01' },
		push: vi.fn(),
	}),
}));

describe('Menu', () => {
	it('change list status', () => {
		const setItem = vi.spyOn(Storage.prototype, 'setItem');
		const queriesWordList = new QueriesWordList();
		render(<Menu />);

		fireEvent.click(screen.getByRole('change-list-status'));

		expect(setItem).toHaveBeenCalledWith(
			'wordList',
			JSON.stringify({
				owner: 'user',
				listIndex: '0',
				listName: 'List01',
				listStatus: 'current',
			})
		);

		expect(queriesWordList.changeWordListStatus).toHaveBeenCalledWith({
			listName: 'List01',
			owner: 'user',
			wordListIndex: 0,
			wordListStatusOld: 'next',
			wordListStatusNew: 'current',
		});
	});
});
