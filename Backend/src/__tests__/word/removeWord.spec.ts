import mongoose from "mongoose";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import { createUser } from "../__utils__/createUser";
import { ListQueries } from "../__utils__/queries/list";
import { IUser } from "../../interfaces/user";
import { List } from "../../interfaces/list";
import { WordQueries } from "../__utils__/queries/word";
import { ListModel } from "../../models/list";
import { IWord } from "../../interfaces/word";

describe("Remove word", () => {
	const listQueries = new ListQueries();
	const wordQueries = new WordQueries();

	let url: string;
	let user: IUser;
	let list: List;

	const defaultWord = {
		term: "Hello",
		definitions: "olá",
		correctTimes: 0,
		learned: false,
	};

	const createList = async () => {
		const { data } = await listQueries.createList(url, { createList: { name: "listName", userID: String(user?.ID) } });
		return data!;
	};

	beforeAll(async () => {
		await startDatabase();
		url = await startServer(0);
		user = await createUser(url);
		list = await createList();
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	test("List not found", async () => {
		const wrongID = "a" + String(list._id).slice(1);
		const { error } = await wordQueries.removeWord(url, { removeWord: { listID: wrongID, wordIndex: 0 } });
		expect(error).toMatch("notFound:");
	});

	test("Word not found", async () => {
		const { error } = await wordQueries.removeWord(url, { removeWord: { listID: String(list._id), wordIndex: 999 } });
		expect(error).toMatch("notFound:");
	});

	test("Remove one word", async () => {
		const currentList = await ListModel.findOne({ _id: list._id });
		const wordIndex = 1;

		const newWords: IWord[] = [
			{ ...defaultWord, term: "01" },
			{ ...defaultWord, term: "02" },
			{ ...defaultWord, term: "03" },
			{ ...defaultWord, term: "04" },
		];

		currentList!.words.push(...newWords);
		await currentList!.save();

		const { data } = await wordQueries.removeWord(url, { removeWord: { listID: String(list._id), wordIndex } });
		expect(data).toBe(`success: Word "${newWords[wordIndex].term}" was removed.`);
	});
});
