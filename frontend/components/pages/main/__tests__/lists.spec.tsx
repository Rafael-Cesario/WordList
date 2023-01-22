import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Lists } from '../lists';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Lists component', () => {
	const lists = ['list01', 'list02', 'list03', 'list04'];

	beforeAll(() => render(<Lists props={{ lists }} />));

	test('Show all the lists on the page', () => {
		const lists = screen.getAllByTitle('List');
		expect(lists).toHaveLength(4);
	});
});
