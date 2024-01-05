import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";

export const Login = () => {
	return (
		<StyledForm>
			<h1 className="title">Login</h1>

			<form>
				<Field label="Email" name="email" placeholder="Digite seu email" type="text" />
				<Field label="Senha" name="password" placeholder="Digite sua senha" type="password" />

				<button className="submit">Entrar</button>
				<button className="change-form" type="button">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledForm>
	);
};
