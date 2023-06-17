import mongoose, { ObjectId, mongo } from "mongoose";
import { startDatabase } from "../../database";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createUser } from "../__utils__/createUser";
import { ListQueries } from "../__utils__/queries/list";
import { ListModel } from "../../models/list";

describe("Read lists", () => {
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

	it("Returns a array of lists", async () => {
		await listQueries.createList(url, { createList: { name: "New list", userID: user.ID as unknown as ObjectId } });
		const { data } = await listQueries.readLists(url, { userID: user.ID as unknown as ObjectId });
		expect(data).toHaveLength(1);
		expect(data?.[0]).toHaveProperty("_id");
		expect(data?.[0]).toHaveProperty("name", "new list");
		expect(data?.[0]).toHaveProperty("userID", user.ID);
	});

	it("Didn't find the user", async () => {
		const { error } = await listQueries.readLists(url, { userID: new mongoose.Types.ObjectId() as unknown as ObjectId });
		expect(error).toBe("User not found");
	});

	it("Returns a empty array when the user has no list", async () => {
		const { data } = await listQueries.readLists(url, { userID: user.ID as unknown as ObjectId });
		expect(data).toEqual([]);
	});
});
