import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderHomePage } from "./__utils__/renderHomePage";
import * as QueriesList from "@/hooks/useQueriesList";

describe("Create list", () => {
	const mockQueriesList = QueriesList as { useQueriesList: object };
	const user = userEvent.setup();

	test("Create a new list show on the page", async () => {
		const listName = "My new list";

		mockQueriesList.useQueriesList = () => ({
			requestReadLists: () => ({ lists: [] }),
			requestCreateList: () => ({ list: { name: listName } }),
		});

		await renderHomePage();
		await user.click(screen.getByRole("show-create-input"));
		await user.type(screen.getByRole("list-name"), listName);
		await user.click(screen.getByRole("create-list"));

		const listContainer = screen.getByRole("list-container");
		expect(listContainer.children.length).toBe(1);
		expect(listContainer.children[0]).toHaveTextContent(listName);

		const notification = screen.getByRole("notification");
		expect(notification).toBeInTheDocument();
		expect(notification.getAttribute("type")).toBe("success");
	});

	test("Can't create a list without a name", async () => {
		await renderHomePage();
		await user.click(screen.getByRole("show-create-input"));
		await user.click(screen.getByRole("create-list"));
		const notification = screen.getByRole("notification");
		expect(notification).toBeInTheDocument();
		expect(notification.getAttribute("type")).toBe("error");
	});

	test("Notify if request failed", async () => {
		mockQueriesList.useQueriesList = () => ({
			requestReadLists: () => ({ lists: [] }),
			requestCreateList: () => ({ error: "Hello" }),
		});

		await renderHomePage();
		await user.click(screen.getByRole("show-create-input"));
		await user.type(screen.getByRole("list-name"), "My new list");
		await user.click(screen.getByRole("create-list"));
		const notification = screen.getByRole("notification");
		expect(notification.getAttribute("type")).toBe("error");
	});
});

vi.mock("@/hooks/useQueriesList", () => ({
	useQueriesList: vi.fn(),
}));

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	Cookies.prototype.get = () => ({ ID: "123" });
	return { Cookies };
});
