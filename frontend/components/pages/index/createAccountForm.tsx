import { useState } from "react";
import { queriesUser } from "../../../services/queries/queriesUser";
import { sendNotification } from "../../../utils/sendNotification";
import { validations } from "../../../utils/validations";
import { verifyErrors } from "../../../utils/verifyErrors";
import { PasswordInput, TextInput } from "../../inputs/inputs";
import { sendError } from "../wordList/utils/sendError";
import { StyledForm } from "./styles/styledForm";
import { Title } from "./title";

interface CreateAccountProps {
	props: {
		changeFormState: (formName: string) => void;
	};
}

export const CreateAccountForm = ({ props }: CreateAccountProps) => {
	const { changeFormState } = props;
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const [showNotification, setShowNotification] = useState(false);

	const verifyFields = (values: { email: string; name: string; password: string; confirmPassword: string }) => {
		const { email, name, password, confirmPassword } = values;

		const fields = {
			email: validations.email(email),
			name: validations.name(name),
			password: validations.password(password),
			confirmPassword: validations.confirmPassword(password, confirmPassword),
		};

		const hasErrors = verifyErrors(fields);
		return hasErrors;
	};

	const submit = async () => {
		const { email, name, password, confirmPassword } = values;

		const hasErrors = verifyFields({ email, name, password, confirmPassword });
		if (hasErrors) return;

		const user = { email, name, password };
		const { error } = await queriesUser.createUser(user);
		if (error) return sendError("email", "Este email já esta sendo usado");

		setValues({});
		sendNotification(setShowNotification);
	};

	return (
		<StyledForm>
			<Title props={{ title: "Criar conta", changeFormState, formName: "create" }} />

			<div className='inputs'>
				<TextInput props={{ name: "email", content: "Email", values, setValues }} />
				<TextInput props={{ name: "name", content: "Nome", values, setValues }} />
				<PasswordInput props={{ name: "password", content: "Senha", values, setValues }} />
				<PasswordInput props={{ name: "confirmPassword", content: "Confirme sua senha", values, setValues }} />
			</div>

			<button onClick={() => submit()} className='confirm'>
				Criar Conta
			</button>

			{showNotification && (
				<h1 className='notification' role={"message"}>
					Uma nova conta foi criada
				</h1>
			)}
		</StyledForm>
	);
};
