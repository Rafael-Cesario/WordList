import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import StudyList from '../../../../pages/[listName]/studyList';

vi.mock('../../../../utils/hooks/useQueriesWords');

vi.mock('next/router', () => ({
	useRouter: () => ({
		query: { listName: 'list01' },
		push: vi.fn(),
	}),
}));

describe('Study list page', () => {
	it('show end list component', () => {
		render(<StudyList />);

		let clicks = 4;
		while (clicks) {
			fireEvent.click(screen.getByRole('confirm'));
			fireEvent.click(screen.getByRole('force-right'));
			clicks--;
		}

		expect(screen.getByRole('end-list')).toBeInTheDocument();
	});
});
