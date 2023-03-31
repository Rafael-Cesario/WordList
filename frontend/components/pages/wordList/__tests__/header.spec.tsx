import '@testing-library/jest-dom';
import { Header } from '../header';
import { beforeEach, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../../../utils/hooks/useLocalData');
vi.mock('../../../../utils/hooks/useQueriesWords');

describe('Header', () => {
	beforeEach(() => {
		render(<Header />);
	});

	it('show list name in the header', () => {
		expect(screen.getByRole('title')).toHaveTextContent('List01');
	});

	it('show how many words user has', () => {
		expect(screen.getByRole('user-words')).toHaveTextContent(/4/);
	});

	it('show the list status', () => {
		expect(screen.getByRole('list-status')).toHaveTextContent(/Próximas/);
	});
});
