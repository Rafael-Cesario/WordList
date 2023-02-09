import { saveCookies } from "../saveCookies";
import { test, vi } from "vitest";

test("saveCookies", () => {
	const mock = vi.fn();
	saveCookies({ email: "userEmail", password: "userPassword" }, mock);

	expect(mock).toHaveBeenCalledTimes(2);
	expect(mock).toHaveBeenCalledWith("email", "userEmail");
	expect(mock).toHaveBeenCalledWith("password", "userPassword");
});
