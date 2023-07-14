import "@testing-library/jest-dom";
import UserEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { AddWords } from "../addWords";
import { Notification } from "@/components/notification";
import { WordsContainer } from "../wordsContainer";
import { cleanup, screen } from "@testing-library/react";
import { RGetOneList } from "@/services/interfaces/list";

import * as QueriesWords from "@/hooks/useQueriesWords";
const mockQueriesWords = QueriesWords as { useQueriesWords: object };

describe("Add Words component", () => {
	const user = UserEvent.setup();

	const message = "";
	let error = "";

	mockQueriesWords.useQueriesWords = () => ({
		requestAddWords: () => ({ message, error }),
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

	it("Show new words on the page and a success notification", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.type(screen.getByRole("input-term"), "Hello");
		await user.type(screen.getByRole("input-translation"), "Olá");
		await user.click(screen.getByRole("add-words"));
		const newWord = screen.getByText("Hello");
		expect(newWord).toBeInTheDocument();
		expect(screen.getByRole("notification").querySelector(".title")?.textContent).toBe("Novas palavras adicionadas");
	});

	it("Focus on the term input after adding a new word", async () => {
		await user.click(screen.getByRole("open-menu"));
		await user.type(screen.getByRole("input-term"), "Hello");
		await user.type(screen.getByRole("input-translation"), "Olá");
		await user.click(screen.getByRole("add-words"));
		expect(screen.getByRole("input-term")).toHaveFocus();
	});

	it.todo("Clear all the words inside textarea");
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

vi.mock("next/navigation", async () => ({
	useRouter: vi.fn(),
	useServerInsertedHTML: vi.fn(),
}));

vi.mock("@/hooks/useQueriesWords", () => ({
	useQueriesWords: vi.fn(),
}));

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	const user = { listID: "123", userID: "123" };
	Cookies.prototype.get = () => user;
	return { Cookies };
});

vi.mock("@/services/client", () => {
	const list: RGetOneList = {
		getOneList: {
			_id: "",
			userID: "",
			name: "",
			wordsPerWordList: 20,
			timesUntilLearning: 20,
			words: [],
		},
	};

	const client = {
		query: () => ({ list }),
		readQuery: () => list,
		writeQuery: vi.fn(),
	};

	return { client };
});
