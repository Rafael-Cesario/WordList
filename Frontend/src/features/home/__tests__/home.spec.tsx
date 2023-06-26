import "@testing-library/jest-dom";
import Home from "@/app/page";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/components/providers";
import { render, screen, waitFor } from "@testing-library/react";
import { Notification } from "@/components/notification";

import * as QueriesList from "@/hooks/useQueriesList";
const mockQueriesList = QueriesList as { useQueriesList: object };

vi.mock("@/hooks/useQueriesList", () => ({
	useQueriesList: null,
}));

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	Cookies.prototype.get = () => ({ ID: "123" });
	return { Cookies };
});

const renderComponent = async () => {
	await waitFor(() =>
		render(
			<AllProviders>
				<Notification />
				<Home />
			</AllProviders>
		)
	);
};

describe("Create list", () => {
	const user = userEvent.setup();

	test("Create a new list show on the page", async () => {
		const listName = "My new list";

		mockQueriesList.useQueriesList = () => ({
			requestReadLists: () => ({ lists: [] }),
			requestCreateList: () => ({ list: { name: listName } }),
		});

		await renderComponent();
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
		await renderComponent();
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

		await renderComponent();
		await user.click(screen.getByRole("show-create-input"));
		await user.type(screen.getByRole("list-name"), "My new list");
		await user.click(screen.getByRole("create-list"));
		const notification = screen.getByRole("notification");
		expect(notification.getAttribute("type")).toBe("error");
	});
});
