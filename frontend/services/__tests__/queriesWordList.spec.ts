import { describe, test, expect } from "vitest";
import { server } from "./__mocks__/server";
import { QueriesWordList } from "../queries/queriesWordList";

describe("Queries WordList", () => {
	const queriesWordList = new QueriesWordList();

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test("getWordLists", async () => {
		const response = await queriesWordList.getWordLists({ listName: "list01", owner: "user" });
		expect(response.wordLists).toHaveProperty("next");
		expect(response.wordLists).toHaveProperty("current");
		expect(response.wordLists).toHaveProperty("done");
	});

	test("getWordLists error", async () => {
		const response = await queriesWordList.getWordLists({ listName: "", owner: "" });
		expect(response.error).toMatch(/owner was not provided/i);
	});

	test("Create word list", async () => {
		const response = await queriesWordList.createWordList({ listName: "name", owner: "userEmail" });
		expect(response).toHaveProperty("message");
		expect(response.message).toMatch(/New wordList created/i);
	});

	test("Create word list, error", async () => {
		const response = await queriesWordList.createWordList({ listName: "", owner: "" });
		expect(response).toHaveProperty("error");
		expect(response.error).toMatch(/Owner was not provided/i);
	});

	test("Delete wordList", async () => {
		const response = await queriesWordList.deleteWordList({
			listName: "list01",
			owner: "user",
			wordListIndex: "0",
			wordListStatus: "next",
		});
		expect(response.message).toBe("WordList deleted");
	});

	test("Delete wordList", async () => {
		const response = await queriesWordList.deleteWordList({
			listName: "list01",
			owner: "",
			wordListIndex: "0",
			wordListStatus: "next",
		});
		expect(response.error).toMatch(/owner was not provided/i);
	});

	test("Change wordList status", async () => {
		const response = await queriesWordList.changeWordListStatus({
			listName: "list01",
			owner: "user",
			wordListIndex: "0",
			wordListStatusNew: "next",
			wordListStatusOld: "current",
		});
		expect(response.message).toBe("Status updated");
	});

	test("Change wordList status", async () => {
		const response = await queriesWordList.changeWordListStatus({
			listName: "list01",
			owner: "",
			wordListIndex: "0",
			wordListStatusNew: "next",
			wordListStatusOld: "current",
		});
		expect(response.error).toMatch(/owner was not provided/i);
	});
});
