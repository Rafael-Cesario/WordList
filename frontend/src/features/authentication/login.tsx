import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";
import { useState } from "react";
import { produce } from "immer";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { LoadingButton } from "./components/loading-button";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const Login = ({ setActiveForm }: Props) => {
	const defaultValues = { email: "", password: "" };
	type FormKeys = keyof typeof defaultValues;

	const [formData, setFormData] = useState({ ...defaultValues });
	const [formErrors, setFormErrors] = useState({ ...defaultValues });

	const [loginMutation, { loading }] = useMutation<LoginResponse, LoginInput>(userQueries.LOGIN);

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

	// Todo >
	// - login mutation
	// > loading button
	// x catch errors, invalid credentials
	// x create cookies api GET and POST route
	// x helper functions to create cookies
	// x save token on cookies
	// x save user data on local storage
	// x Reset form values
	// x send user to home page
	const login = async () => {
		console.log({ formData, formErrors });
		try {
			const { data } = await loginMutation({ variables: { loginData: formData } });
			if (!data) throw new Error("Server didn't return data");

			console.log(data?.login);
		} catch (error) {
			console.log({ error });
		}
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

				{loading || (
					<button data-cy="submit-form" className="submit">
						Entrar
					</button>
				)}

				{loading && <LoadingButton className="submit" />}

				<button data-cy="change-form" onClick={() => setActiveForm("create")} className="change-form" type="button">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledForm>
	);
};
