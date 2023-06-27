import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderHomePage } from "./__utils__/renderHomePage";
import * as QueriesList from "@/hooks/useQueriesList";

describe("List container, load lists", () => {
	const mockedQueriesList = QueriesList as { useQueriesList: object };

	const listsMockedResponse = [
		{ _id: "123", name: "list01" },
		{ _id: "456", name: "list02" },
		{ _id: "789", name: "list03" },
	];

	let error = "";

	mockedQueriesList.useQueriesList = () => ({
		requestReadLists: () => ({ lists: listsMockedResponse, error }),
	});

	it("Load the lists on the page", async () => {
		await renderHomePage();
		const lists = screen.getByRole("list-container").children;
		expect(lists.length).toBe(listsMockedResponse.length);
	});

	it("Catch the response error", async () => {
		error = "Error loading lists";
		await renderHomePage();
		expect(screen.getByRole("notification")).toBeInTheDocument();
		expect(screen.getByRole("notification").getAttribute("type")).toBe("error");
	});
});

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	Cookies.prototype.get = () => ({ ID: "123" });
	return { Cookies };
});

vi.mock("@/hooks/useQueriesList");
