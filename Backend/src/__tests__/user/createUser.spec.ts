import mongoose from "mongoose";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import { UserQueries } from "../../utils/queries/user";
import { UserModel } from "../../models/user";
import { defaultUser } from "../../utils/placeHolders";

const userQueries = new UserQueries();

describe("Create a new user", () => {
	let url: string;

	beforeAll(async () => {
		await startDatabase();
		url = await startServer(0);
	});

	beforeEach(async () => {
		await UserModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it("Throws a error, empty variables", async () => {
		const { error } = await userQueries.createUser(url, { createUser: { email: "", password: "" } });
		expect(error).toBe("email was not provided, password was not provided");
	});

	it("Can't create a user with the same email", async () => {
		await userQueries.createUser(url, { createUser: defaultUser });
		const { error } = await userQueries.createUser(url, { createUser: defaultUser });

		expect(error).toMatch("duplicated:");
	});

	it("Create a new user", async () => {
		const { data } = await userQueries.createUser(url, { createUser: defaultUser });
		expect(data).toEqual({ message: "New user created with success." });
	});
});
