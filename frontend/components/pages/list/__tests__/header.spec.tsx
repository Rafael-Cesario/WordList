import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";

vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../utils/hooks/useQueriesWordList");

describe("Header", () => {
	it("show the listName in the header", () => {
		render(<Header />);
		expect(screen.getByRole("listName")).toHaveTextContent("List01");
	});
});
