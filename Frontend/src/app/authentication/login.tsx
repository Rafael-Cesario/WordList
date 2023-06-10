import { StyledLogin } from "./styles/loginStyle";

export const Login = () => {
	return (
		<StyledLogin>
			<h1 className="title">Login</h1>

			<div className="fields">
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Senha" />
				<button className="login-button">Entrar</button>
			</div>

			<button className="change-form">Não tem uma conta? Clique aqui para criar.</button>
		</StyledLogin>
	);
};
