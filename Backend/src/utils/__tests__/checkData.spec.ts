import { checkData } from "../checkData";

describe("Utils - checkData", () => {
	it("Returns a string with the key of all the empty values", () => {
		const values = { email: "", password: "", name: "user" };
		const emptyValues = checkData(values);
		expect(emptyValues).toBe("email was not provided, password was not provided");
	});

	it("Returns a empty string", () => {
		const values = {};
		const emptyValues = checkData(values);
		expect(emptyValues).toBe("");
	});

	it("Returns a empty string", () => {
		const values = { email: "user@email" };
		const emptyValues = checkData(values);
		expect(emptyValues).toBe("");
	});
});
