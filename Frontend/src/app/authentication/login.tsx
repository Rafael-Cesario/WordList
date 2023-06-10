import { StyledLogin } from "./styles/loginStyle";

export const Login = () => {
	return (
		<StyledLogin>
			<h1>Login</h1>
			<input type="text" placeholder="email" />
			<input type="text" placeholder="email" />
			<button>Entrar</button>
			<span>Não tem uma conta? Clique aqui para criar.</span>
		</StyledLogin>
	);
};
