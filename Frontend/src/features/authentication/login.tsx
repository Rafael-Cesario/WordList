import { FormEvent, SetStateAction, useState } from "react";
import { StyledForms } from "./styles/formsStyle";
import { Password } from "./password";
import { produce } from "immer";
import { Fields } from "./createAccount";
import { checkForEmptyValues } from "@/utils/checkForEmptyValues";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

const defaultValues = {
	email: "",
	password: "",
};

export const Login = ({ props: { setFormName } }: ILogin) => {
	const [values, setValues] = useState(defaultValues);
	const [errors, setErrors] = useState(defaultValues);

	const changeValue = (newValue: string, fieldName: keyof Fields) => {
		const newState = produce(values, (draft) => {
			draft[fieldName as keyof typeof draft] = newValue;
		});

		setValues(newState);
	};

	const submitForm = (e: FormEvent) => {
		e.preventDefault();

		const emptyValues = checkForEmptyValues(values);
		const hasEmptyValues = Object.keys(emptyValues).length;
		if (hasEmptyValues) return setErrors({ ...defaultValues, ...emptyValues });
	};

	return (
		<StyledForms>
			<h1 className="title">Login</h1>

			<form onSubmit={(e) => submitForm(e)} className="fields">
				<label className="label-error">{errors.email}</label>
				<input
					className={errors.email ? "error" : ""}
					onChange={(e) => changeValue(e.target.value, "email")}
					autoFocus={true}
					type="text"
					placeholder="Email"
				/>
				<Password changeValue={changeValue} errors={errors} fieldName="password" placeholder="Senha" />
				<button className="submit">Entrar</button>
			</form>

			<button className="change-form" onClick={() => setFormName("create")}>
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForms>
	);
};
