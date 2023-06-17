import mongoose from "mongoose";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import { UserQueries } from "../__utils__/queries/user";
import { defaultUser } from "../../utils/placeHolders";

const userQueries = new UserQueries();

describe("Login", () => {
	let url: string;

	beforeAll(async () => {
		await startDatabase();
		url = await startServer(0);

		await userQueries.createUser(url, { createUser: defaultUser });
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it("Throws a error, invalid credentials", async () => {
		let response = await userQueries.login(url, { login: { email: "", password: "" } });
		expect(response.error).toBe("Invalid credentials");

		response = await userQueries.login(url, { login: { email: "", password: "123" } });
		expect(response.error).toBe("Invalid credentials");

		response = await userQueries.login(url, { login: { email: defaultUser.email, password: "wrong" } });
		expect(response.error).toBe("Invalid credentials");
	});

	it("Returns a token, and the user's ID", async () => {
		const { data } = await userQueries.login(url, { login: defaultUser });
		expect(data).toHaveProperty("token");
		expect(data).toHaveProperty("ID");
	});
});
