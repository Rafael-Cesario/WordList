import "@testing-library/jest-dom";
import { Header } from "../header";
import { describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../utils/hooks/useQueriesWords");

describe("Header", () => {
	it("show list name in the header", () => {
		render(<Header />);
		expect(screen.getByRole("title")).toHaveTextContent("List01");
	});
});
