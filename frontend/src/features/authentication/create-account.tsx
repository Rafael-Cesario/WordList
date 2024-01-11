import { produce } from "immer";
import { useState } from "react";
import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";
import { validations } from "./utils/validations";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const CreateAccount = ({ setActiveForm }: Props) => {
	const defaultValues = {
		email: "",
		name: "",
		password: "",
		passwordCheck: "",
	};

	const [formData, setFormData] = useState({ ...defaultValues });
	const [formErrors, setFormErrors] = useState({ ...defaultValues });

	type IFormKeys = keyof typeof formData;

	const updateValues = (key: IFormKeys, value: string) => {
		const state = produce(formData, (draft) => void (draft[key] = value));
		setFormData(state);
		validate(key, state);
	};

	const validate = (key: IFormKeys, state: typeof formData) => {
		const error = validations[key](state);
		const newState = produce(formErrors, (draft) => void (draft[key] = error));
		setFormErrors(newState);
	};

	const validateAll = () => {
		const formKeys = Object.keys(formData) as IFormKeys[];
		const errors = { ...defaultValues };

		formKeys.forEach((key) => (errors[key] = validations[key](formData)));

		setFormErrors(errors);

		const hasErrors = Object.values(errors).filter((error) => error).length > 0;
		return hasErrors;
	};

	const createAccount = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ formData, formErrors });

		const hasErrors = validateAll();
		if (hasErrors) return;

		// Todo >
		// create user request
		// clear form
		// notification
		// change to login form
		// catch errors
	};

	return (
		<StyledForm>
			<h1 data-cy="title-create" className="title">
				Criar conta
			</h1>

			<form onSubmit={(e) => createAccount(e)}>
				<Field
					onChange={(newValue: string) => updateValues("email", newValue)}
					label="Email"
					name="email"
					placeholder="Digite seu email"
					type="text"
					error={formErrors.email}
				/>
				<Field
					onChange={(newValue: string) => updateValues("name", newValue)}
					label="Nome"
					name="name"
					placeholder="Digite seu nome"
					type="text"
					error={formErrors.name}
				/>
				<Field
					onChange={(newValue: string) => updateValues("password", newValue)}
					label="Senha"
					name="password"
					placeholder="Digite sua senha"
					type="password"
					error={formErrors.password}
				/>

				<Field
					onChange={(newValue: string) =>
						updateValues("passwordCheck", newValue)
					}
					label="Confirme sua senha"
					name="password-check"
					placeholder="Digite sua senha"
					type="password"
					error={formErrors.passwordCheck}
				/>

				<button data-cy="submit-form" className="submit">
					Criar
				</button>

				<button
					data-cy="change-form"
					onClick={() => setActiveForm("login")}
					className="change-form"
					type="button">
					Já tem uma conta? Clique aqui para entrar.
				</button>
			</form>
		</StyledForm>
	);
};
