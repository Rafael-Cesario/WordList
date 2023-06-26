import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderHomePage } from "./__utils__/renderHomePage";
import * as QueriesList from "@/hooks/useQueriesList";

describe("Delete list", () => {
	const mockedQueriesList = QueriesList as { useQueriesList: object };
	const user = userEvent.setup();

	mockedQueriesList.useQueriesList = () => ({
		requestReadLists: () => ({
			lists: [
				{ _id: "123", userID: "123", name: "List01" },
				{ _id: "321", userID: "321", name: "List02" },
			],
		}),

		requestDeleteList: () => ({ error: "Hello, i'm a error" }),
	});

	const openDeleteListMenu = async () => {
		await user.click(screen.getByText(/list02/i));
		await user.click(screen.getByRole("show-delete-list"));
	};

	it("Send a notification if user type wrong the list name", async () => {
		await renderHomePage();
		await openDeleteListMenu();
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("notification").getAttribute("type")).toBe("error");

		await user.type(screen.getByRole("submit-input"), "Wrong Name");
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("notification").getAttribute("type")).toBe("error");
	});

	it("Send a notification if the request return a error", async () => {
		await renderHomePage();
		await openDeleteListMenu();
		await user.type(screen.getByRole("submit-input"), "list02");
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("notification").getAttribute("type")).toBe("error");
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
