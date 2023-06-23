import mongoose from "mongoose";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import { createUser } from "../__utils__/createUser";
import { ListQueries } from "../__utils__/queries/list";
import { List } from "../../interfaces/list";
import { ListModel } from "../../models/list";
import { IUser } from "../../interfaces/user";
import { WordQueries } from "../__utils__/queries/word";

describe("Add words request", () => {
	let url: string;
	let user: IUser;
	let list: List;

	const listQueries = new ListQueries();
	const wordQueries = new WordQueries();

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

	const deleteAllWords = async () => await ListModel.findOneAndUpdate({ _id: list._id }, { words: [] });

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

	afterEach(async () => {
		await deleteAllWords();
	});

	test("List not found", async () => {
		const wrongID = "a" + String(list._id).slice(1);

		const { error } = await wordQueries.addWords(url, {
			addWords: { listID: wrongID, words: [] },
		});

		expect(error).toMatch("notFound:");
	});

	test("Can't add if term or definition is empty", async () => {
		const withoutTerm = await wordQueries.addWords(url, {
			addWords: { listID: String(list._id), words: [{ ...defaultWord, term: "" }] },
		});
		expect(withoutTerm.error).toMatch("emtpyWord:");

		const withoutDefinition = await wordQueries.addWords(url, {
			addWords: { listID: String(list._id), words: [{ ...defaultWord, definitions: "" }] },
		});
		expect(withoutDefinition.error).toMatch("emtpyWord:");
	});

	test("Properties learned and correctTimes must be false and zero", async () => {
		await wordQueries.addWords(url, { addWords: { listID: String(list._id), words: [{ ...defaultWord, correctTimes: 10, learned: true }] } });
		const { words } = (await ListModel.findOne({ _id: list._id })) as List;
		expect(words[0].learned).toBe(false);
		expect(words[0].correctTimes).toBe(0);
	});

	test("Terms should be unique", async () => {
		await wordQueries.addWords(url, { addWords: { listID: String(list._id), words: [{ ...defaultWord, correctTimes: 10, learned: true }] } });
		const { error } = await wordQueries.addWords(url, {
			addWords: { listID: String(list._id), words: [{ ...defaultWord, correctTimes: 10, learned: true }] },
		});
		expect(error).toMatch("duplicated");
	});

	test("Add a new word", async () => {
		const words = [
			{ ...defaultWord, term: "01" },
			{ ...defaultWord, term: "02" },
			{ ...defaultWord, term: "03" },
			{ ...defaultWord, term: "04" },
		];

		const { data } = await wordQueries.addWords(url, { addWords: { listID: String(list._id), words } });
		expect(data).toMatch(`${words.length} words`);
	});
});
