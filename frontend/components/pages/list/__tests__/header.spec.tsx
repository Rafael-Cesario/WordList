import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../header';

vi.mock('../../../../utils/hooks/useLocalData');
vi.mock('../../../../utils/hooks/useQueriesWordList');

vi.mock('next/router', () => ({
	useRouter: () => ({
		query: { listName: 'list01' },
	}),
}));

describe('Header', () => {
	beforeEach(() => {
		render(<Header />);
	});

	it('show the listName in the header', () => {
		expect(screen.getByRole('listName')).toHaveTextContent('List01');
	});

	it('show how many words user has', () => {
		expect(screen.getByRole('words-count')).toHaveTextContent('5 palavras');
	});

	it('open and close configs', () => {
		fireEvent.click(screen.getByRole('open-configs'));
		expect(screen.getByRole('configs-title')).toBeInTheDocument();
	});
});
