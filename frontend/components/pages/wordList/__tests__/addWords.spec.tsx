import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, vi, test, expect } from "vitest";
import { AddWords } from "../addWords";
import { ContextWords } from "../context/contextWords";

const addWords = vi.fn();
const removeWords = vi.fn();
const renameWords = vi.fn();

const DummyAddWords = () => {
	return (
		<ContextWords.Provider
			value={{
				words: [["repeated", "dummy"]],
				addWords,
				removeWords,
				renameWords,
			}}>
			<AddWords />
		</ContextWords.Provider>
	);
};

describe("Add words", () => {
	test("Add words", async () => {
		render(<DummyAddWords />);

		const inputTerm = screen.getByRole("term").children[1];
		const inputDefinition = screen.getByRole("definition").children[1];
		const buttonAddWords = screen.getByRole("button", { name: "Adicionar" });

		await act(async () => {
			await userEvent.type(inputTerm, "MyTerm");
			await userEvent.type(inputDefinition, "MyDefinition");
			fireEvent.click(buttonAddWords);
		});

		expect(addWords).toHaveBeenCalledWith(["MyTerm", "MyDefinition"]);
		expect(inputTerm).toHaveValue("");
		expect(inputDefinition).toHaveValue("");

		const elementWithFocus = document.activeElement;
		expect(inputTerm).toEqual(elementWithFocus);
	});

	test("Repeated words can't be added", async () => {
		render(<DummyAddWords />);

		const labelTerm = screen.getByRole("term").children[0];
		const inputTerm = screen.getByRole("term").children[1];
		const inputDefinition = screen.getByRole("definition").children[1];
		const buttonAddWords = screen.getByRole("button", { name: "Adicionar" });

		await act(async () => {
			await userEvent.type(inputTerm, "Repeated");
			await userEvent.type(inputDefinition, "MyDefinition");
			fireEvent.click(buttonAddWords);
		});

		expect(labelTerm).toHaveTextContent("Esta palavra já foi adicionada");
	});
});
