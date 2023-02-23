import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DeleteList } from "../deleteList";
import { queriesList } from "../../../../services/queries/queriesList";

vi.mock("../../../../services/queries/queriesList");
vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../utils/hooks/useQueriesWordList");

vi.mock("next/router", () => ({
	useRouter: () => ({
		push: vi.fn(),
		query: { listName: "List01" },
	}),
}));

describe("Delete List", () => {
	it("delete the current list", () => {
		render(<DeleteList />);
		fireEvent.click(screen.getByRole("delete-list"));
		fireEvent.click(screen.getByRole("confirm-delete-list"));

		expect(queriesList.deleteList).toHaveBeenCalledWith({
			listName: "List01",
			owner: "user",
		});
	});
});
