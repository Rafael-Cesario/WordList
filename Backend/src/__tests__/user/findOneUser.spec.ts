import mongoose from "mongoose";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import { UserQueries } from "../../utils/queries/user";
import { defaultUser } from "../../utils/placeHolders";

const userQueries = new UserQueries();

describe("Find one user", () => {
	let url: string;

	beforeAll(async () => {
		await startDatabase();
		url = await startServer(0);
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it("Has empty variables", async () => {
		const { error } = await userQueries.findOneUser(url, { email: "" });
		expect(error).toBe("Email was not provided");
	});

	it("Don't find the user", async () => {
		const { data } = await userQueries.findOneUser(url, { email: "fakeUser@nonExistent.com" });
		expect(data).toEqual({ message: "User not found", user: null });
	});

	it("Returns the user with an empty password", async () => {
		await userQueries.createUser(url, { createUser: defaultUser });
		const { data } = await userQueries.findOneUser(url, { email: defaultUser.email });
		expect(data).toEqual({ message: null, user: { email: "user@test.com", password: "" } });
	});
});
