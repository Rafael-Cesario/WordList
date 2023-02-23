import { QueriesWordList } from "../../../../services/queries/queriesWordList";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, vi } from "vitest";
import { DeleteWordList } from "../deleteWordList";

vi.mock("next/router", () => ({
	useRouter: () => ({
		query: { listName: "list01" },
		push: vi.fn(),
	}),
}));

vi.mock("../../../../utils/hooks/useQueriesWordList");
vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../services/queries/queriesWordList");

describe("Delete wordList", () => {
	beforeEach(() => {
		render(<DeleteWordList />);
	});

	it("ask for a confirmation before deleting the wordList", async () => {
		fireEvent.click(screen.getByRole("delete-btn"));
		expect(await screen.findByRole("delete-btn-confirm")).toHaveTextContent(/Clique novamente para excluir/);

		fireEvent.blur(screen.getByRole("delete-btn-confirm"));
		expect(screen.queryByRole("delete-btn-confirm")).not.toBeInTheDocument();
	});

	it("Delete a wordList", () => {
		const queriesWordList = new QueriesWordList();

		fireEvent.click(screen.getByRole("delete-btn"));
		fireEvent.click(screen.getByRole("delete-btn-confirm"));

		expect(queriesWordList.deleteWordList).toHaveBeenCalledWith({
			listName: "List01",
			owner: "user",
			wordListIndex: Number(0),
			wordListStatus: "next",
		});
	});
});
