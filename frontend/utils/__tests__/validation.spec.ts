import { describe, expect, test } from "vitest";
import { validations } from "../validations";

describe("Validation", () => {
	test("email validation", () => {
		const empty = validations.email("");
		expect(empty).toBe("email: Este campo não pode ficar vazio");

		const includesSymbol = validations.email("withoutSymbol.com");
		expect(includesSymbol).toBe("email: @ não encontrado.");

		const withoutUser = validations.email("@domain.com");
		expect(withoutUser).toBe("email: Email invalido, usuario ou dominio não preenchido.");

		const withoutDomain = validations.email("User@");
		expect(withoutDomain).toBe("email: Email invalido, usuario ou dominio não preenchido.");
	});

	test("name validation", () => {
		const empty = validations.name("");
		expect(empty).toBe("name: Este campo não pode ficar vazio");

		const long = validations.name("A name like this is not a valid name");
		expect(long).toBe("name: Seu nome é muito longo");
	});

	test("password validation", () => {
		const empty = validations.password("");
		expect(empty).toBe("password: Este campo não pode ficar vazio");

		const capitalLetter = validations.password("password");
		expect(capitalLetter).toBe("password: Ao menos uma letra maiuscula deve existir");

		const lowercaseLetter = validations.password("PASSWORD");
		expect(lowercaseLetter).toBe("password: Ao menos uma letra minuscula deve existir");

		const shortPassword = validations.password("Password");
		expect(shortPassword).toBe("password: Sua senha deve conter ao menos 10 letras");
	});

	test("confirm password", () => {
		const empty = validations.confirmPassword("password", "");
		expect(empty).toBe("confirmPassword: Este campo não pode ficar vazio");

		const diff = validations.confirmPassword("password", "diffPassword");
		expect(diff).toBe("confirmPassword: Suas senhas devem ser iguais");
	});

	test("empty fields", () => {
		const fields = { email: "", password: "" };
		let empties = validations.emptyFields(fields);

		expect(empties).toHaveProperty("email");
		expect(empties.email).toBe("email: Este campo não pode ficar vazio");

		empties = validations.emptyFields({});
		expect(empties).toStrictEqual({});

		empties = validations.emptyFields({ email: "notEmpty" });
		expect(empties).toStrictEqual({});
	});
});
