import jwt from "jsonwebtoken";
import { generateToken } from "../token";

describe("Util - Token", () => {
	it("Generate a token with the email in the payload", () => {
		const email = "user@123";
		const token = generateToken(email);
		const decoded = jwt.decode(token);
		expect(decoded).toHaveProperty("email", email);
	});
});
