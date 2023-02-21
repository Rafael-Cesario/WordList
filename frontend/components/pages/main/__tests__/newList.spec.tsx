import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NewList } from "../newList";

describe("New list", () => {
	beforeEach(() => {
		cleanup();
		render(<NewList />);
	});

	it("open and close new list form", async () => {
		act(() => fireEvent.click(screen.getByRole("btn-new-list")));
		expect(await screen.findByRole("new-list-title")).toBeInTheDocument();

		act(() => fireEvent.click(screen.getByRole("btn-new-list")));
		expect(screen.queryByRole("new-list-title")).not.toBeInTheDocument();
	});
});
