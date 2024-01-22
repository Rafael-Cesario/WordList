import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";
import { useState } from "react";
import { produce } from "immer";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const Login = ({ setActiveForm }: Props) => {
	const defaultValues = { email: "", password: "" };
	type FormKeys = keyof typeof defaultValues;

	const [formData, setFormData] = useState({ ...defaultValues });
	const [formErrors, setFormErrors] = useState({ ...defaultValues });

	const updateValue = (key: FormKeys, value: string) => {
		const newState = produce(formData, (draft) => void (draft[key] = value));
		setFormData(newState);
	};

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (hasEmptyValues()) return;
		login();
	};

	const hasEmptyValues = () => {
		const entries = Object.entries(formData);
		const errors = { ...defaultValues };
		let hasEmpty = false;

		entries.forEach(([key, value]) => {
			if (value) return;

			hasEmpty = true;
			errors[key as FormKeys] = "Este campo não pode ficar vazio.";
		});

		setFormErrors(errors);
		return hasEmpty;
	};

	const login = () => {
		console.log({ formData, formErrors });
		return;
	};

	return (
		<StyledForm>
			<h1 className="title" data-cy="title-login">
				Login
			</h1>

			<form onSubmit={(e) => submitForm(e)}>
				<Field
					value={formData.email}
					error={formErrors.email}
					onChange={(value: string) => updateValue("email", value)}
					label="Email"
					name="email"
					placeholder="Digite seu email"
					type="text"
				/>

				<Field
					value={formData.password}
					error={formErrors.password}
					onChange={(value: string) => updateValue("password", value)}
					label="Senha"
					name="password"
					placeholder="Digite sua senha"
					type="password"
				/>

				<button data-cy="submit-form" className="submit">Entrar</button>

				<button data-cy="change-form" onClick={() => setActiveForm("create")} className="change-form" type="button">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledForm>
	);
};
