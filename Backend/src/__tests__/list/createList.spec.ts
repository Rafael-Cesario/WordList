import mongoose, { ObjectId } from "mongoose";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import { ListQueries } from "../__utils__/queries/list";
import { IUser } from "../../interfaces/user";
import { ListModel } from "../../models/list";
import { createUser } from "../__utils__/createUser";

describe("Create list", () => {
	const listQueries = new ListQueries();
	let url: string;
	let user: IUser;

	beforeAll(async () => {
		await startDatabase();
		url = await startServer(0);
		user = (await createUser(url)) as IUser;
	});

	afterEach(async () => {
		await ListModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it("Throws a error for empty values", async () => {
		const { error } = await listQueries.createList(url, { createList: { name: "", userID: "" } });
		expect(error).toBe("userID was not provided, name was not provided");
	});

	it("Throws a error if didn't find the user", async () => {
		const userID = new mongoose.Types.ObjectId();
		const { error } = await listQueries.createList(url, { createList: { name: "qwe", userID: String(userID) } });
		expect(error).toBe("User not found");
	});

	it("Throws a error, duplicated lists", async () => {
		const variables = { name: "qwe", userID: String(user.ID) };
		await listQueries.createList(url, { createList: variables });
		const { error } = await listQueries.createList(url, { createList: variables });
		expect(error).toMatch("Duplicated");
	});

	it("Create a new list", async () => {
		const { data } = await listQueries.createList(url, { createList: { name: "new list", userID: String(user.ID) } });
		expect(data?.name).toBe("new list");
		expect(data?._id).toBeDefined();
	});
});
