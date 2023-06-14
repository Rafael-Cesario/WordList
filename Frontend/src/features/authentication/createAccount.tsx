import { produce } from "immer";
import { FormEvent, SetStateAction, useState } from "react";
import { StyledForms } from "./styles/formsStyle";
import { Password } from "./password";
import { checkForEmptyValues } from "@/utils/checkForEmptyValues";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

export interface Fields {
	email: string;
	password: string;
	confirmPassword: string;
}

const defaultFormValues = {
	email: "",
	password: "",
	confirmPassword: "",
};

export const CreateAccount = ({ props: { setFormName } }: ILogin) => {
	const [values, setValues] = useState<Fields>(defaultFormValues);
	const [errors, setErrors] = useState<Fields>(defaultFormValues);

	const changeValue = (newValue: string, field: keyof typeof values) => {
		const newState = produce(values, (draft) => {
			draft[field] = newValue;
		});

		setValues(newState);
	};

	const validatePassword = (password: string) => {
		if (password.length < 10) return { password: "Sua senha precisa ter ao menos 10 caracteres" };
		if (!password.match(/[A-Z]/)) return { password: "Sua senha precisa ter ao menos 1 letra maiúscula" };
		if (!password.match(/[a-z]/)) return { password: "Sua senha precisa ter ao menos 1 letra minúscula" };
		if (!password.match(/[0-9]/)) return { password: "Sua senha precisa ter ao menos 1 número" };
	};

	const validateEmail = (email: string) => {
		if (!email.match(/@/)) return { email: "Seu email não parece valido" };

		const [user, domain] = email.split("@");
		if (!user) return { email: "Seu email não parece valido" };
		if (!domain) return { email: "Seu email não parece valido" };
	};

	const submitForm = (e: FormEvent) => {
		e.preventDefault();

		const emptyValues = checkForEmptyValues(values);
		const hasEmptyValues = Object.keys(emptyValues).length;
		if (hasEmptyValues) return setErrors({ ...defaultFormValues, ...emptyValues });

		const emailIsNotValid = validateEmail(values.email);
		if (emailIsNotValid) return setErrors({ ...defaultFormValues, ...emailIsNotValid });

		const passwordIsNotValid = validatePassword(values.password);
		if (passwordIsNotValid) return setErrors({ ...defaultFormValues, ...passwordIsNotValid });

		if (values.password !== values.confirmPassword) return setErrors({ ...defaultFormValues, confirmPassword: "Suas senhas devem ser iguais" });

		setErrors(defaultFormValues);

		// todo > create account
	};

	return (
		<StyledForms>
			<h1 className="title">Criar Conta</h1>

			<form className="fields" onSubmit={(e) => submitForm(e)}>
				<label className="label-error">{errors.email}</label>
				<input type="text" className={errors.email ? "error" : ""} placeholder={"Email"} onChange={(e) => changeValue(e.target.value, "email")} />
				<Password errors={errors} placeholder={"Senha"} changeValue={changeValue} fieldName="password" />
				<Password errors={errors} placeholder={"Confirme sua senha"} changeValue={changeValue} fieldName="confirmPassword" />
				<button className="submit">Criar Conta</button>
			</form>

			<button className="change-form" onClick={() => setFormName("login")}>
				Voltar para tela de login
			</button>
		</StyledForms>
	);
};
