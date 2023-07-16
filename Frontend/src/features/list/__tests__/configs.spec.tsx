import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { Configs } from "../configs";
import { Notification } from "@/components/notification";
import { WordsContainer } from "../wordsContainer";
import { cleanup, screen } from "@testing-library/react";

describe("Configs component", () => {
	const user = userEvent.setup();

	beforeAll(async () => {
		await renderWithProviders(<Component />);
	});

	afterEach(() => cleanup());

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

	it.todo("Open notification due to a request error");
	it.todo("close configs after saving");
	it.todo("Update the group of words in the page");
});

const Component = () => (
	<>
		<Configs />
		<Notification />
		<WordsContainer list={{ listID: "123", userID: "123" }} />
	</>
);
