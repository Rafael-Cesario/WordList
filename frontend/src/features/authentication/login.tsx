import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const Login = ({ setActiveForm }: Props) => {
	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
				<Field label="Email" name="email" placeholder="Digite seu email" type="text" />
				<Field label="Senha" name="password" placeholder="Digite sua senha" type="password" />

				<button className="submit">Entrar</button>

				<button onClick={() => setActiveForm("create")} className="change-form" type="button">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledForm>
	);
};
