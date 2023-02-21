import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Lists } from "../lists";
import { useLists } from "../../../../utils/hooks/useLists";

vi.mock("next/router", () => ({
	useRouter() {
		return {
			query: "list01",
		};
	},
}));

vi.mock("../../../../utils/hooks/useLists");

describe("Lists", () => {
	it("show lists on the page", () => {
		vi.mocked(useLists).mockReturnValue({ error: false, isLoading: false, lists: ["list01", "list02"], mutate: vi.fn() });
		render(<Lists />);

		const lists = screen.getAllByRole("list");
		expect(lists.length).toBe(2);
	});

	it.todo("loading lists");
	it.todo("error loading lists");
	it.todo("user has no lists");
});
