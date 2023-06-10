import { SetStateAction } from "react";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

export const CreateAccount = ({ props: { setFormName } }: ILogin) => {
	return (
		<>
			<h1>Create Account</h1>
			<button onClick={() => setFormName("login")}>Voltar para tela de login</button>
		</>
	);
};
