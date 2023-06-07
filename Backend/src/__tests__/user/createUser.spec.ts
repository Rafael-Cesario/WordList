import mongoose from "mongoose";
import request from "supertest-graphql";
import { startDatabase } from "../../database";
import { startServer } from "../../server";
import gql from "graphql-tag";

const CREATE_USER = gql`
	mutation CreateUser($createUser: ICreateUser) {
		createUser(createUser: $createUser) {
			message
		}
	}
`;

describe("Create a new user", () => {
	let url: string;

	beforeAll(async () => {
		await startDatabase();
		url = await startServer(0);
	});

	afterAll(async () => {
		// mongoose.connection.dropDatabase();
		mongoose.connection.close();
	});

	it("Throws a error, empty variables", async () => {
		const { data, errors } = await request(url)
			.mutate(CREATE_USER)
			.variables({ createUser: { email: "", password: "" } });

		console.log({ data, errors });
	});
});
