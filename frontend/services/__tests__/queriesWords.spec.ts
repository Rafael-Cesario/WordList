import { describe, test, expect } from "vitest";
import { QueriesWords } from "../queries/queriesWords";
import { server } from "./__mocks__/server";

type StatusType = "next" | "current" | "done";

describe("Queries words", () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	const queriesWords = new QueriesWords();

	describe("Add words", () => {
		const words = {
			listName: "list01",
			owner: "user",
			listIndex: "0",
			definition: "def",
			term: "term",
			status: "next" as StatusType,
		};

		test("Add words", async () => {
			const addWords = await queriesWords.addWords({ words });
			const message = addWords.message;
			expect(message).toBe("New word added");
		});

		test("Add words, error", async () => {
			const addWords = await queriesWords.addWords({ words: { ...words, listName: "" } });
			const message = addWords.error;
			expect(message).toMatch(/ListName was not provided/i);
		});
	});

	describe("GetWords", () => {
		const words = {
			listIndex: "0",
			listName: "list01",
			owner: "user",
			status: "next" as StatusType,
		};

		test("Get Words", async () => {
			const getWords = await queriesWords.getWords({ words });
			expect(getWords).toMatchObject({ words: [["word01", "word0101"]] });
		});

		test("Get words error", async () => {
			const getWords = await queriesWords.getWords({ words: { ...words, listName: "" } });
			expect(getWords.error).toMatch(/Listname was not provided/i);
		});
	});

	describe("RenameWords", () => {
		const words = {
			listIndex: "0",
			listName: "list01",
			listStatus: "next" as StatusType,
			newWords: ["word01", "word02"],
			owner: "user",
			wordIndex: "0",
		};

		test("Rename words", async () => {
			const renameWords = await queriesWords.renameWords({ words });
			expect(renameWords.message).toBe("Words updated");
		});

		test("Rename words error", async () => {
			const renameWords = await queriesWords.renameWords({ words: { ...words, listName: "" } });
			expect(renameWords.error).toMatch(/Listname was not provided/i);
		});
	});

	describe("Remove words", () => {
		const words = {
			listIndex: "0",
			listName: "list01",
			owner: "user",
			status: "next" as StatusType,
			wordIndex: "0",
		};

		test("Remove words", async () => {
			const removeWords = await queriesWords.removeWords({ words });
			expect(removeWords.message).toBe("Words removed");
		});

		test("Remove words error", async () => {
			const removeWords = await queriesWords.removeWords({ words: { ...words, listName: "" } });
			expect(removeWords.error).toMatch(/ListName was not provided/i);
		});
	});
});
