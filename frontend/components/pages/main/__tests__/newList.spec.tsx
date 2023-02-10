import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, afterEach, beforeEach, afterAll } from "vitest";
import { NewList } from "../newList";
import { server } from "../../../../services/__tests__/__mocks__/server";

describe("New list component", () => {
	const lists: string[] = [];
	const setLists = vi.fn();

	beforeAll(() => server.listen());

	beforeEach(() => {
		server.resetHandlers();
		render(<NewList props={{ lists, setLists }} />);
	});

	afterAll(() => server.close());

	afterEach(() => {
		vi.restoreAllMocks();
		cleanup();
	});

	test("Show add new list form", () => {
		const button = screen.getByTitle("Button new list");
		fireEvent.click(button);

		const newListForm = screen.getByTitle("New list");
		expect(newListForm).toBeInTheDocument();
	});

	test("Add new lists", async () => {
		act(() => {
			fireEvent.click(screen.getByTitle("Button new list"));
		});

		await waitFor(async () => await screen.findByPlaceholderText("Nome"));

		await act(async () => {
			const input = screen.getByPlaceholderText("Nome");
			const createListButton = screen.getByTitle("Create new list");

			await userEvent.type(input, "DummyList");
			fireEvent.click(createListButton);
		});

		expect(setLists).toHaveBeenCalledWith(["DummyList"]);
		expect(screen.getByPlaceholderText("Nome")).toHaveValue("");
	});
});
