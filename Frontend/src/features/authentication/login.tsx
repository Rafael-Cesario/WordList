import { SetStateAction } from "react";
import { StyledForms } from "./styles/formsStyle";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

export const Login = ({ props: { setFormName } }: ILogin) => {
	return (
		<StyledForms>
			<h1 className="title">Login</h1>

			<form className="fields">
				<input autoFocus={true} type="text" placeholder="Email" />
				<input type="password" placeholder="Senha" />
				<button className="submit">Entrar</button>
			</form>

			<button className="change-form" onClick={() => setFormName("create")}>
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForms>
	);
};
