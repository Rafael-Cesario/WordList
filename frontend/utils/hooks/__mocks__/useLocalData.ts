import { vi } from "vitest";

export const useLocalData = () => ({
	storage: {
		listIndex: "0",
		listName: "List01",
		listStatus: "next",
		owner: "user",
	},

	setStorage: vi.fn(),
});
