import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { Configs } from "../configs";
import { Notification } from "@/components/notification";
import { WordsContainer } from "../wordsContainer";
import { cleanup, screen } from "@testing-library/react";

import * as QueriesList from "@/hooks/useQueriesList";
import { RGetOneList } from "@/services/interfaces/list";
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

	it("Update the group of words in the page", async () => {
		let groups = screen.getAllByRole("words-group");
		expect(groups.length).toBe(1);

		await user.click(screen.getByRole("open-close-configs"));
		await user.type(screen.getByRole("input-words-per-wordlist"), "1");
		await user.click(screen.getByRole("save-configs"));

		groups = screen.getAllByRole("words-group");
		expect(groups.length).toBe(6);
	});
});

const Component = () => (
	<>
		<Configs />
		<Notification />
		<WordsContainer list={{ listID: "123", userID: "123" }} />
	</>
);

vi.mock("@/services/client", () => {
	const list: RGetOneList = {
		getOneList: {
			_id: "",
			userID: "",
			name: "",
			wordsPerWordList: 20,
			timesUntilLearning: 20,
			words: [
				{ term: "dummyWord-01", definitions: "Olá", correctTimes: 0, learned: false },
				{ term: "dummyWord-02", definitions: "Olá", correctTimes: 0, learned: false },
				{ term: "dummyWord-03", definitions: "Olá", correctTimes: 0, learned: false },
				{ term: "dummyWord-04", definitions: "Olá", correctTimes: 0, learned: false },
				{ term: "dummyWord-05", definitions: "Olá", correctTimes: 0, learned: false },
				{ term: "dummyWord-06", definitions: "Olá", correctTimes: 0, learned: false },
			],
		},
	};

	const client = {
		query: () => ({ list }),
		readQuery: () => list,
		writeQuery: vi.fn(),
	};

	return { client };
});
