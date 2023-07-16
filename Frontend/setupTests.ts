import { RGetOneList } from "@/services/interfaces/list";
import { vi } from "vitest";

vi.mock("next/navigation", async () => ({
	useRouter: () => ({ push: vi.fn() }),
	useServerInsertedHTML: vi.fn(),
}));

vi.mock("@/hooks/useQueriesWords", () => ({
	useQueriesWords: vi.fn(),
}));

vi.mock("@/hooks/useQueriesList", () => ({
	useQueriesList: vi.fn(),
}));

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	const user = { listID: "123", userID: "123" };
	Cookies.prototype.get = () => user;
	return { Cookies };
});

vi.mock("@/services/client", () => {
	const list: RGetOneList = {
		getOneList: {
			_id: "",
			userID: "",
			name: "",
			wordsPerWordList: 20,
			timesUntilLearning: 20,
			words: [],
		},
	};

	const client = {
		query: () => ({ list }),
		readQuery: () => list,
		writeQuery: vi.fn(),
		mutate: vi.fn(),
	};

	return { client };
});
