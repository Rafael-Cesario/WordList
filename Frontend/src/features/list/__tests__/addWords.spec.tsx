import "@testing-library/jest-dom";
import UserEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { AddWords } from "../addWords";
import { Notification } from "@/components/notification";
import { WordsContainer } from "../wordsContainer";
import { cleanup, screen } from "@testing-library/react";
import { IAddWords } from "@/services/interfaces/words";

import * as QueriesWords from "@/hooks/useQueriesWords";
const mockQueriesWords = QueriesWords as { useQueriesWords: object };

describe("Add Words component", () => {
	const user = UserEvent.setup();

	let message = "";
	let error = "";

	mockQueriesWords.useQueriesWords = () => ({
		requestAddWords: ({ addWords }: IAddWords) => {
			message = String(addWords.words.length);
			return { message, error };
		},
	});

	beforeEach(async () => {
		await renderWithProviders(<Component />);
	});

	afterEach(() => {
		cleanup();
		error = "";
	});

	it("Open and close menu", async () => {
		await user.click(screen.getByRole("open-menu"));
		expect(screen.getByRole("menu-container")).toBeInTheDocument();
	});

	it("Change between menus", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.click(screen.getByRole("menu-change-many"));
		expect(screen.getByRole("many-words")).toBeInTheDocument();
	});

	it("Send a error notification if input is empty", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.click(screen.getByRole("add-words"));
		expect(screen.getByRole("notification").querySelector(".title")).toHaveTextContent("Campos vazios");
	});

	it("Send a notification if textarea is empty", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.click(screen.getByRole("menu-change-many"));
		await user.click(screen.getByRole("add-words"));
		expect(screen.getByRole("notification").querySelector(".title")).toHaveTextContent("Campos vazios");
	});

	it("Open notification due to a request response error", async () => {
		error = "Error trying to add new words";
		await user.click(screen.getByRole("open-menu"));
		await user.type(screen.getByRole("input-term"), "Hello");
		await user.type(screen.getByRole("input-translation"), "Olá");
		await user.click(screen.getByRole("add-words"));
		expect(screen.getByRole("notification").querySelector(".description")).toHaveTextContent(error);
	});

	it("Add new words using the individual method", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.type(screen.getByRole("input-term"), "Hello");
		await user.type(screen.getByRole("input-translation"), "Olá");
		await user.click(screen.getByRole("add-words"));
		const newWord = screen.getByText("Hello");
		expect(newWord).toBeInTheDocument();
		expect(screen.getByRole("notification").querySelector(".description")?.textContent).toBe("1");
	});

	it("Focus on the term input after adding a new word", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.type(screen.getByRole("input-term"), "Hello");
		await user.type(screen.getByRole("input-translation"), "Olá");
		await user.click(screen.getByRole("add-words"));
		expect(screen.getByRole("input-term")).toHaveFocus();
	});

	it("Add new words using the many method", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.click(screen.getByRole("menu-change-many"));
		await user.type(screen.getByRole("many-words"), "Hello: Olá\nBottle: Garrafa");
		await user.click(screen.getByRole("add-words"));
		expect(screen.getByRole("many-words")).toHaveValue("");

		const newWord = screen.getByText("Bottle");
		expect(newWord).toBeInTheDocument();
		expect(screen.getByRole("notification").querySelector(".description")?.textContent).toBe("2");
	});
});

const Component = () => {
	return (
		<>
			<Notification />
			<AddWords />
			<WordsContainer list={{ listID: "123", userID: "123" }} />
		</>
	);
};
