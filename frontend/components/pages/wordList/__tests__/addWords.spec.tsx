import { it, describe, vi, beforeEach } from "vitest";
import { AddWords } from "../addWords";
import userEvent from "@testing-library/user-event";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueriesWords } from "../../../../services/queries/queriesWords";

vi.mock("../../../../utils/hooks/useQueriesWords");
vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../services/queries/queriesWords");

describe("Add words", () => {
	beforeEach(() => {
		render(<AddWords />);
	});

	it("add new words", async () => {
		await userEvent.type(screen.getByRole("input-term"), "word01");
		await userEvent.type(screen.getByRole("input-definition"), "word02");

		fireEvent.click(screen.getByRole("btn-add-words"));

		const queriesWords = new QueriesWords();
		const variableWords = { listName: "List01", owner: "user", definition: "word02", term: "word01", listIndex: "0", status: "next" };

		await waitFor(() => {
			expect(queriesWords.addWords).toHaveBeenCalledWith({ words: variableWords });
		});

		const isElementOnFocus = document.activeElement === screen.getByRole("input-term");
		expect(isElementOnFocus).toBe(true);
	});
});
