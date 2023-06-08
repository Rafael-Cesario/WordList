import { decryptPassword, encryptPassword } from "../crypt";

describe("Util - Crypt", () => {
	it("Hash a password", () => {
		const password = "123";
		const hashed = encryptPassword(password);
		expect(hashed).not.toBe(password);
	});

	it("returns false for a different password and true for the right password", () => {
		const password = "123";
		const hashed = encryptPassword(password);

		let isSamePassword = decryptPassword(password, hashed);
		expect(isSamePassword).toBe(true);

		isSamePassword = decryptPassword("wrong", hashed);
		expect(isSamePassword).toBe(false);
	});
});
