import { vi } from 'vitest';

export const useQueriesWordListSWR = () => ({
	data: {
		next: [[[]], [[]]],
		current: [],
		done: [[[], [], []]],
	},

	error: false,
	isLoading: false,
	mutate: vi.fn(),
});
