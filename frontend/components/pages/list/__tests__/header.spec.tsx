import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContextWordList } from "../../../../contexts/contextWordList";
import { Header } from "../header";

vi.mock("next/router", () => ({
	useRouter() {
		return {
			query: { listName: "list01" },
		};
	},
}));

const renderHeader = () => {
	render(
		<ContextWordList.Provider
			value={{
				setWordList: vi.fn(),
				wordList: {
					next: [
						[[], [], []],
						[[], []],
					],
					current: [
						[[], [], [], [], [], []],
						[[], [], []],
						[[], []],
					],
					done: [
						[[], []],
						[[], []],
					],
				},
				changeWordListStatus: vi.fn(),
				deleteWordList: vi.fn(),
			}}>
			<Header />
		</ContextWordList.Provider>
	);
};

describe("Header component", () => {
	test("Get total words", () => {
		renderHeader();
		const totalWords = screen.getByRole("wordsCount");
		expect(totalWords).toHaveTextContent("20 palavras");
	});
});
