import { QueriesWordList } from "../../../../services/queries/queriesWordList";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
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
	it("ask for a confirmation before deleting the wordList", async () => {
		render(<DeleteWordList />);

		fireEvent.click(screen.getByRole("delete-btn"));
		expect(await screen.findByRole("delete-btn-confirm")).toHaveTextContent(/Clique novamente para excluir/);

		fireEvent.blur(screen.getByRole("delete-btn-confirm"));
		expect(screen.queryByRole("delete-btn-confirm")).not.toBeInTheDocument();
	});
});
