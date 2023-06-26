import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderHomePage } from "./__utils__/renderHomePage";
import * as QueriesList from "@/hooks/useQueriesList";

const mockedQueriesList = QueriesList as { useQueriesList: object };

describe("Delete list", () => {
	const user = userEvent.setup();

	it("Send a notification if user type wrong the list name", async () => {
		mockedQueriesList.useQueriesList = () => ({
			requestReadLists: () => ({
				lists: [
					{ _id: "123", userID: "123", name: "List01" },
					{ _id: "321", userID: "321", name: "List02" },
				],
			}),
		});

		await renderHomePage();
		await user.click(screen.getByText(/list02/i));
		await user.click(screen.getByRole("show-delete-list"));
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("notification").getAttribute("type")).toBe("error");

		await user.type(screen.getByRole("submit-input"), "Wrong Name");
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
