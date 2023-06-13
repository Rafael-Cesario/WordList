import { produce } from "immer";
import { FormEvent, SetStateAction, useState } from "react";
import { StyledForms } from "./styles/formsStyle";
import { Password } from "./password";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

export const CreateAccount = ({ props: { setFormName } }: ILogin) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const changeValue = (newValue: string, field: keyof typeof values) => {
		const newState = produce(values, (draft) => {
			draft[field] = newValue;
		});

		setValues(newState);
	};

	const submitForm = (e: FormEvent) => {
		e.preventDefault();
		console.log({ values });
	};

	return (
		<StyledForms>
			<h1 className="title">Criar Conta</h1>

			<form className="fields" onSubmit={(e) => submitForm(e)}>
				<input type="text" placeholder="Email" onChange={(e) => changeValue(e.target.value, "email")} />
				<Password placeholder="Senha" changeValue={changeValue} fieldName="password" />
				<Password placeholder="Confirme sua senha" changeValue={changeValue} fieldName="confirmPassword" />
				<button className="submit">Criar Conta</button>
			</form>

			<button className="change-form" onClick={() => setFormName("login")}>
				Voltar para tela de login
			</button>
		</StyledForms>
	);
};
