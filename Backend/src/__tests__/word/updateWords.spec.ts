import mongoose from "mongoose";
import { startDatabase } from "../../database";
import { List } from "../../interfaces/list";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createUser } from "../__utils__/createUser";
import { ListQueries } from "../__utils__/queries/list";
import { WordQueries } from "../__utils__/queries/word";
import { ListModel } from "../../models/list";

describe("Update Words", () => {
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
		const { error } = await wordQueries.updateWords(url, {
			updateWords: {
				listID: wrongID,
				firstWordIndex: 0,
				updatedWords: [defaultWord],
			},
		});

		expect(error).toMatch("notFound:");
	});

	test("Word index is out of bound", async () => {
		const { error } = await wordQueries.updateWords(url, {
			updateWords: {
				listID: String(list._id),
				firstWordIndex: 999,
				updatedWords: [defaultWord],
			},
		});

		expect(error).toBe("notFound: Word index is out of bound.");
	});

	test("There's no words to update", async () => {
		const { error } = await wordQueries.updateWords(url, {
			updateWords: {
				listID: String(list._id),
				firstWordIndex: 0,
				updatedWords: [],
			},
		});

		expect(error).toBe("emptyValues: There is no words to update.");
	});

	test("Update one word", async () => {
		let currentList = await ListModel.findOne({ _id: list._id });
		currentList!.words.push(defaultWord);
		await currentList!.save();

		const { data } = await wordQueries.updateWords(url, {
			updateWords: {
				listID: String(list._id),
				firstWordIndex: 0,
				updatedWords: [
					{
						term: "new",
						definitions: "new",
						correctTimes: 10,
						learned: true,
					},
				],
			},
		});

		currentList = await ListModel.findOne({ _id: list._id });

		expect(currentList!.words.length).toBe(1);
		expect(currentList!.words[0]).not.toEqual(defaultWord);
		expect(data).toBe("success: 1 updated word.");
	});
});
