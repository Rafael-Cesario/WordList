import { vi } from "vitest";

export const useQueriesWordsSWR = () => ({
	words: [[], [], [], []],
	error: false,
	isLoading: false,
	mutate: vi.fn(),
});
