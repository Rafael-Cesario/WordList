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

	const submitForm = (e: FormEvent) => {
		e.preventDefault();

		const emptyValues = checkForEmptyValues(values);
		const hasEmptyValues = Object.keys(emptyValues).length;
		if (hasEmptyValues) return setErrors({ ...defaultFormValues, ...emptyValues });

		setErrors(defaultFormValues);
	};

	return (
		<StyledForms>
			<h1 className="title">Criar Conta</h1>

			<form className="fields" onSubmit={(e) => submitForm(e)}>
				<input
					type="text"
					className={errors.email ? "error" : ""}
					placeholder={errors.email || "Email"}
					onChange={(e) => changeValue(e.target.value, "email")}
				/>

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
