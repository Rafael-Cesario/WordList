import { vi } from "vitest";

const data = {
	next: [[[]], [[]]],
	current: [],
	done: [[[], [], []]],
};

vi.mock("../useQueriesWordList", () => ({
	useQueriesWordListSWR() {
		return {
			data,
			error: false,
			isLoading: false,
			mutate: vi.fn(),
		};
	},
}));
