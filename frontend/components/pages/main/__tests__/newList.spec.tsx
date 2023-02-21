import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NewList } from "../newList";
import { queriesList } from "../../../../services/queries/queriesList";
import userEvent from "@testing-library/user-event";

vi.mock("../../../../services/queries/queriesList", () => ({
	queriesList: { createList: vi.fn() },
}));

vi.mock("../../../../utils/hooks/useLocalData", () => ({
	useLocalData() {
		return {
			storage: {
				owner: "user",
			},
		};
	},
}));

vi.mock("../../../../utils/hooks/useLists", () => ({
	useLists: () => {
		return { mutate: vi.fn() };
	},
}));

describe("New list", () => {
	beforeEach(() => {
		cleanup();
		render(<NewList />);
	});

	it("open and close new list form", async () => {
		act(() => fireEvent.click(screen.getByRole("btn-new-list")));
		expect(await screen.findByRole("new-list-title")).toBeInTheDocument();
		act(() => fireEvent.click(screen.getByRole("btn-new-list")));
		expect(screen.queryByRole("new-list-title")).not.toBeInTheDocument();
	});

	it("create a new list", async () => {
		const listName = "my new list";

		act(() => fireEvent.click(screen.getByRole("btn-new-list")));
		await userEvent.type(screen.getByRole("input-name"), listName);
		act(() => fireEvent.click(screen.getByRole("create-new-list")));

		await waitFor(() => {
			expect(screen.getByRole("input-name")).toHaveValue("");
			expect(vi.mocked(queriesList).createList).toHaveBeenCalledWith({
				listName,
				owner: "user",
			});
		});
	});
});
