import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { List } from "../list";
import { screen } from "@testing-library/react";

import * as QueriesList from "@/hooks/useQueriesList";
const mockedQueriesList = QueriesList as { useQueriesList: object };

describe("[ Unit ] List component", () => {
	const user = userEvent.setup();

	mockedQueriesList.useQueriesList = () => ({
		requestRenameList: vi.fn(),
	});

	beforeEach(async () => {
		await renderWithProviders(<List props={{ list: { _id: "123", userID: "321", name: "ListName" } }} />);
	});

	it("Show and hide menu", async () => {
		await user.click(screen.getByRole("list"));
		expect(screen.getByRole("menu")).toBeInTheDocument();
		await user.click(screen.getByRole("list"));
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("Show and hide button to confirm delete", async () => {
		await user.click(screen.getByRole("list"));
		await user.click(screen.getByRole("show-delete-list"));
		expect(screen.getByRole("delete-container")).toBeInTheDocument();
		await user.click(screen.getByRole("close-delete-list"));
		expect(screen.queryByRole("delete-container")).not.toBeInTheDocument();
	});
});
