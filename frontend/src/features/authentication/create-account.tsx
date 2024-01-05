import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const CreateAccount = ({ setActiveForm }: Props) => {
	return (
		<StyledForm>
			<h1 data-cy="title-create" className="title">Criar conta</h1>

			<form>
				<Field label="Email" name="email" placeholder="Digite seu email" type="text" />
				<Field label="Nome" name="name" placeholder="Digite seu nome" type="text" />
				<Field label="Senha" name="password" placeholder="Digite sua senha" type="password" />
				<Field label="Confirme sua senha" name="password-check" placeholder="Digite sua senha" type="password" />

				<button className="submit">Criar</button>

				<button data-cy="change-form" onClick={() => setActiveForm("login")} className="change-form" type="button">
					Já tem uma conta? Clique aqui para entrar.
				</button>
			</form>
		</StyledForm>
	);
};
