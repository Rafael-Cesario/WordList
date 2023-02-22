import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";

vi.mock("../../../../utils/hooks/useLocalData");
vi.mock("../../../../utils/hooks/useQueriesWordList");

describe("Header", () => {
	beforeEach(() => {
		render(<Header />);
	});

	it("show the listName in the header", () => {
		expect(screen.getByRole("listName")).toHaveTextContent("List01");
	});

	it("show how many words user has", () => {
		expect(screen.getByRole("words-count")).toHaveTextContent("5 palavras");
	});
});
