import { vi } from "vitest";

export const useQueriesWordsSWR = () => ({
	words: [
		["word", "word"],
		["word", "word"],
		["word", "word"],
		["word", "word"],
	],
	error: false,
	isLoading: false,
	mutate: vi.fn(),
});
