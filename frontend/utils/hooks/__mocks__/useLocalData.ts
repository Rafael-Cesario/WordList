import { vi } from "vitest";

vi.mock("../useLocalData", () => ({
	useLocalData() {
		return {
			storage: {
				listIndex: "0",
				listName: "List01",
				listStatus: "next",
				owner: "user",
			},
		};
	},
}));
