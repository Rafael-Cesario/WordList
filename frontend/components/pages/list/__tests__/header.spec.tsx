import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";

vi.mock("../../../../utils/hooks/useLocalData", () => ({
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

vi.mock("../../../../utils/hooks/useQueriesWordList", () => ({
	useQueriesWordListSWR() {
		return {
			data: {
				next: [[[]], [[]]],
				current: [],
				done: [[[], [], []]],
			},
			error: false,
			isLoading: false,
			mutate: vi.fn(),
		};
	},
}));

describe("Header", () => {
	beforeEach(() => {
		render(<Header />);
	});

	it("show the listName in the header", () => {
		expect(screen.getByRole("listName")).toHaveTextContent("List01");
	});

	it("show how many words user has", () => {
		expect(screen.getByRole("words-count")).toHaveTextContent("5 palavras");
	});
});
