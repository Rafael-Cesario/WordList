import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import { Configs } from "../configs";

vi.mock("next/router", () => ({
	useRouter: () => ({
		query: { listName: "list01" },
	}),
}));

vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../utils/hooks/useQueriesWordList");

describe("Configs", () => {
	const setShowConfigs = vi.fn();

	beforeEach(() => {
		render(<Configs props={{ setShowConfigs }} />);
	});

	it("close configs", () => {
		fireEvent.click(screen.getByRole("close-configs"));
		expect(setShowConfigs).toHaveBeenCalledWith(false);
	});
});
