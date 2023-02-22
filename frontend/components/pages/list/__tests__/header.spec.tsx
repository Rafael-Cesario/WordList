import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";

import { useLocalData } from "../../../../utils/hooks/useLocalData";
vi.mock("../../../../utils/hooks/useLocalData", () => ({
	useLocalData() {
		return {
			storage: {
				listIndex: "0",
				listName: "List01",
				listStatus: "next",
				owner: "user",
			},
		};
	},
}));

import { useQueriesWordListSWR } from "../../../../utils/hooks/useQueriesWordList";
vi.mock("../../../../utils/hooks/useQueriesWordList", () => ({
	useQueriesWordListSWR() {
		return {
			data: { next: [[[], []]] },
			error: false,
			isLoading: false,
			mutate: vi.fn(),
		};
	},
}));

describe("Header", () => {
	it("show the listName in the header", () => {
		render(<Header />);
		expect(screen.getByRole("listName")).toHaveTextContent("List01");
	});
});
