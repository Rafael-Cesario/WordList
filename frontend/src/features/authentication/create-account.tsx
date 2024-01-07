import { useState } from "react";
import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const CreateAccount = ({ setActiveForm }: Props) => {
	const defaultValues = { email: "", name: "", password: "", passwordCheck: "" };
	const [formData, setFormData] = useState(defaultValues);

	const createAccount = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ formData });
	};

	return (
		<StyledForm>
			<h1 data-cy="title-create" className="title">
				Criar conta
			</h1>

			<form onSubmit={(e) => createAccount(e)}>
				<Field onChange={(newValue: string) => setFormData({ ...formData, email: newValue })} label="Email" name="email" placeholder="Digite seu email" type="text" />
				<Field onChange={(newValue: string) => setFormData({ ...formData, name: newValue })} label="Nome" name="name" placeholder="Digite seu nome" type="text" />
				<Field onChange={(newValue: string) => setFormData({ ...formData, password: newValue })} label="Senha" name="password" placeholder="Digite sua senha" type="password" />
				<Field onChange={(newValue: string) => setFormData({ ...formData, passwordCheck: newValue })} label="Confirme sua senha" name="password-check" placeholder="Digite sua senha" type="password" />

				<button className="submit">Criar</button>

				<button data-cy="change-form" onClick={() => setActiveForm("login")} className="change-form" type="button">
					Já tem uma conta? Clique aqui para entrar.
				</button>
			</form>
		</StyledForm>
	);
};
