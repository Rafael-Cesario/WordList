import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";

export const CreateAccount = () => {
	return (
		<StyledForm>
			<h1 className="title">Criar conta</h1>

			<form>
				<Field label="Email" name="email" placeholder="Digite seu email" type="text" />
				<Field label="Nome" name="name" placeholder="Digite seu nome" type="text" />
				<Field label="Senha" name="password" placeholder="Digite sua senha" type="password" />
				<Field label="Confirme sua senha" name="password-check" placeholder="Digite sua senha" type="password" />

				<button className="submit">Criar</button>
				<button className="change-form" type="button">Já tem uma conta? Clique aqui para entrar.</button>
			</form>
		</StyledForm>
	);
};
