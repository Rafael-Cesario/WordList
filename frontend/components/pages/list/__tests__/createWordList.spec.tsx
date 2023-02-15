import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import { WordListType } from "../../../../interfaces/interfaceWordList";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { server } from "../../../../services/__tests__/__mocks__/server";
import { CreateWordList } from "../createWordList";

vi.mock("next/router", () => ({
	useRouter() {
		return { query: { listName: "list01", wordList: "0" } };
	},
}));

vi.mock("../../../../services/cookies", () => ({
	getCookies() {
		return "user";
	},
}));

describe("Create word List", () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test("Create new wordList update the state", async () => {
		const wordList: WordListType = {
			next: [],
			current: [],
			done: [],
		};

		const setWordList = vi.fn();

		render(
			<ContextWordList.Provider value={{ wordList, setWordList, changeWordListStatus: vi.fn(), deleteWordList: vi.fn() }}>
				<CreateWordList />
			</ContextWordList.Provider>
		);

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Lista" }));
			expect(setWordList).toHaveBeenCalledTimes(1);
		});
	});
});
