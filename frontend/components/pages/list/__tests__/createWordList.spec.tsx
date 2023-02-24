import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueriesWordList } from "../../../../services/queries/queriesWordList";
import { CreateWordList } from "../createWordList";

vi.mock("../../../../services/queries/queriesWordList");
vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../utils/hooks/useQueriesWordList");

describe("Create wordList", () => {
	beforeEach(() => {
		render(<CreateWordList />);
	});

	it("create a new wordList", () => {
		fireEvent.click(screen.getByRole("create-new-wordList"));
		const queriesWordList = new QueriesWordList();
		expect(queriesWordList.createWordList).toHaveBeenCalledWith({
			listName: "List01",
			owner: "user",
		});
	});
});
