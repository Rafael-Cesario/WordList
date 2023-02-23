import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { WordList } from "../wordList";

vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("next/router", () => ({
	useRouter: () => ({
		query: { listName: "List01" },
		push: vi.fn(),
	}),
}));

describe("WordList", () => {
	it("show a message when wordList is empty", () => {
		render(<WordList props={{ index: 0, list: [], status: "next" }} />);
		expect(screen.getByRole("empty-list")).toBeInTheDocument();
	});

	it("set a new item on localStorage when user go to a list", () => {
		const setItem = vi.spyOn(Storage.prototype, "setItem");
		render(<WordList props={{ index: 0, list: [[]], status: "next" }} />);
		fireEvent.click(screen.getByRole("wordList"));
		expect(setItem).toHaveBeenCalledWith(
			"wordList",
			JSON.stringify({
				listIndex: "0",
				listName: "List01",
				listStatus: "next",
				owner: "user",
			})
		);
	});
});
