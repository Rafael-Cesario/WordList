import "@testing-library/jest-dom";
import * as QueriesList from "@/hooks/useQueriesList";
import UserEvent from "@testing-library/user-event";
import { renderHomePage } from "./__utils__/renderHomePage";
import { screen } from "@testing-library/react";

describe("Rename list", () => {
	const mockedQueriesList = QueriesList as { useQueriesList: object };
	const user = UserEvent.setup();

	const lists = [{ _id: "123", userID: "123", name: "list01" }];
	let error = "";

	mockedQueriesList.useQueriesList = () => ({
		requestReadLists: () => ({ lists }),
		requestRenameList: () => ({ message: "success", error }),
	});

	it("Change listName to a editable input", async () => {
		await renderHomePage();
		await user.click(screen.getByText(/list01/i));
		await user.click(screen.getByRole("rename-button"));
		expect(screen.getByRole("save-button")).toBeInTheDocument();
		expect(screen.getByRole("input-list-name")).toHaveValue("list01");
	});

	it("Rename a list", async () => {
		const newName = "Renamed";
		await renderHomePage();
		await user.click(screen.getByText(/list01/i));
		await user.click(screen.getByRole("rename-button"));
		await user.clear(screen.getByRole("input-list-name"));
		await user.type(screen.getByRole("input-list-name"), newName);
		await user.click(screen.getByRole("save-button"));
		expect(screen.getByText(newName)).toBeInTheDocument();
	});

	it("Catch the response error", async () => {
		error = "Error renaming list";
		const newName = "Renamed";
		await renderHomePage();
		await user.click(screen.getByText(/list01/i));
		await user.click(screen.getByRole("rename-button"));
		await user.clear(screen.getByRole("input-list-name"));
		await user.type(screen.getByRole("input-list-name"), newName);
		await user.click(screen.getByRole("save-button"));
		expect(screen.getByRole("notification").getAttribute("type")).toBe("error");
	});
});

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	Cookies.prototype.get = () => ({ ID: "123" });
	return { Cookies };
});

vi.mock("@/hooks/useQueriesList");
