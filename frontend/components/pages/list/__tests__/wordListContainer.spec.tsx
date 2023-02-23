import "@testing-library/jest-dom";
import { WordListContainer } from "../wordListContainer";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("WordList container", () => {
	it("show a message when a list is empty", () => {
		const lists = [] as string[][][];
		const status = ["next", "proximas"] as [string, string];
		render(<WordListContainer props={{ lists, status }} />);
		expect(screen.getByRole("empty-list-message")).toBeInTheDocument();
	});
});
