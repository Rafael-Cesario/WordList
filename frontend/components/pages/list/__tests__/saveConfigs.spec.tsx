import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { queriesList } from "../../../../services/queries/queriesList";
import { SaveConfigs } from "../saveConfigs";

vi.mock("../../../../services/queries/queriesList");
vi.mock("../../../../utils/hooks/useLocalData");

vi.mock("next/router", () => ({
	useRouter: () => ({
		query: { listName: "listName" },
		push: vi.fn(),
	}),
}));

describe("Save configs", () => {
	it("change list name", async () => {
		const newName = "my new list";
		const oldName = "List01";
		const values = { listName: newName };
		const setItem = vi.spyOn(Storage.prototype, "setItem");
		const setShowConfigs = vi.fn();

		render(<SaveConfigs props={{ setShowConfigs, values }} />);

		fireEvent.click(screen.getByRole("save-configs"));

		expect(queriesList.changeListName).toHaveBeenCalledWith({
			newName,
			oldName,
			owner: "user",
		});

		await waitFor(() => {
			expect(setItem).toHaveBeenCalledWith(
				"wordList",
				JSON.stringify({
					listIndex: "0",
					listName: newName,
					listStatus: "next",
					owner: "user",
				})
			);
		});

		expect(setShowConfigs).toHaveBeenCalledWith(false);
	});
});
