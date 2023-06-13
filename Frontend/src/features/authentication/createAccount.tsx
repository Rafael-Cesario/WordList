import { SetStateAction } from "react";
import { StyledForms } from "./styles/formsStyle";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

export const CreateAccount = ({ props: { setFormName } }: ILogin) => {
	return (
		<StyledForms>
			<h1 className="title">Criar Conta</h1>

			<form className="fields">
				<input type="text" placeholder="Email" />
				<input type="password" placeholder="Senha" />
				<input type="password" placeholder="Confirme sua senha" />
				<button className="submit">Criar Conta</button>
			</form>

			<button className="change-form" onClick={() => setFormName("login")}>
				Voltar para tela de login
			</button>
		</StyledForms>
	);
};
