import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { Configs } from "../configs";
import { Notification } from "@/components/notification";
import { WordsContainer } from "../wordsContainer";
import { cleanup, screen } from "@testing-library/react";

import * as QueriesList from "@/hooks/useQueriesList";
const mockedQueriesList = QueriesList as { useQueriesList: object };

describe("Configs component", () => {
	const user = userEvent.setup();

	const data = "Hello, your new configs have been saved";
	let error = "";

	mockedQueriesList.useQueriesList = () => ({
		requestUpdateConfigs: () => ({ data, error }),
	});

	beforeEach(async () => {
		await renderWithProviders(<Component />);
	});

	afterEach(() => {
		cleanup();
		error = "";
	});

	it("Open and close configs", async () => {
		await user.click(screen.getByRole("open-close-configs"));
		expect(screen.getByRole("configs-container")).toBeInTheDocument();
	});

	it("Open a notification due to empty fields", async () => {
		await user.click(screen.getByRole("open-close-configs"));

		const inputWordsPerWordList = screen.getByRole("input-words-per-wordlist");
		await user.type(inputWordsPerWordList, "20");
		await user.clear(inputWordsPerWordList);
		await user.click(screen.getByRole("save-configs"));

		const notification = screen.getByRole("notification").querySelector(".description");
		expect(notification).toHaveTextContent("Você não pode deixar campos vazios.");
	});

	it("Open notification due to a request error", async () => {
		error = "Hello, I'm a request error";
		await user.click(screen.getByRole("open-close-configs"));
		await user.click(screen.getByRole("save-configs"));
		const notification = screen.getByRole("notification").querySelector(".description");
		expect(notification).toHaveTextContent(error);
	});

	it("close configs after saving", async () => {
		await user.click(screen.getByRole("open-close-configs"));
		await user.click(screen.getByRole("save-configs"));
		const notification = screen.getByRole("notification").querySelector(".description");
		expect(notification).toHaveTextContent(data);
		expect(screen.queryByRole("configs-container")).not.toBeInTheDocument();
	});

	it.todo("Update the group of words in the page");
});

const Component = () => (
	<>
		<Configs />
		<Notification />
		<WordsContainer list={{ listID: "123", userID: "123" }} />
	</>
);
