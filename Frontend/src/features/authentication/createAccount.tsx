import { produce } from "immer";
import { FormEvent, SetStateAction, useContext, useState } from "react";
import { StyledForms } from "./styles/formsStyle";
import { Password } from "./password";
import { checkForEmptyValues } from "@/utils/checkForEmptyValues";
import { Validations } from "@/utils/validationsClass";
import { useQueriesUser } from "../../hooks/useQueriesUser";
import { NotificationContext } from "@/context/notification";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

export interface Fields {
	email: string;
	password: string;
	confirmPassword: string;
}

const defaultFormValues = {
	email: "",
	password: "",
	confirmPassword: "",
};

export const CreateAccount = ({ props: { setFormName } }: ILogin) => {
	const [values, setValues] = useState<Fields>(defaultFormValues);
	const [errors, setErrors] = useState<Fields>(defaultFormValues);

	const { requestCreateUser } = useQueriesUser();
	const { setNotificationValues } = useContext(NotificationContext);

	const changeValue = (newValue: string, field: keyof typeof values) => {
		const newState = produce(values, (draft) => {
			draft[field] = newValue;
		});

		setValues(newState);
	};

	const validateFields = () => {
		const validations = new Validations();

		const emptyValues = checkForEmptyValues(values);
		const hasEmptyValues = Object.keys(emptyValues).length;
		if (hasEmptyValues) return setErrors({ ...defaultFormValues, ...emptyValues });

		const emailIsNotValid = validations.email(values.email);
		if (emailIsNotValid) return setErrors({ ...defaultFormValues, ...emailIsNotValid });

		const passwordIsNotValid = validations.password(values.password);
		if (passwordIsNotValid) return setErrors({ ...defaultFormValues, ...passwordIsNotValid });

		if (values.password !== values.confirmPassword) return setErrors({ ...defaultFormValues, confirmPassword: "Suas senhas devem ser iguais" });

		setErrors(defaultFormValues);
		return true;
	};

	const submitForm = async (e: FormEvent) => {
		e.preventDefault();

		const isFieldsValid = validateFields();
		if (!isFieldsValid) return;

		const newUser = { email: values.email, password: values.password };
		const { error } = await requestCreateUser({ createUser: newUser });
		if (error) return setNotificationValues({ isOpen: true, message: error, title: "Erro", type: "error" });

		setFormName("login");
		setValues(defaultFormValues);
		setNotificationValues({ type: "success", title: "Novo usuário criado", message: "Boas vindas, você já pode fazer login", isOpen: true });
	};

	return (
		<StyledForms>
			<h1 className="title">Criar Conta</h1>

			<form className="fields" onSubmit={(e) => submitForm(e)}>
				<label htmlFor="email-input" role="email-label" className="label-error">
					{errors.email}
				</label>
				<input
					id="email-input"
					role="input-email"
					autoFocus={true}
					type="text"
					className={errors.email ? "error" : ""}
					placeholder={"Email"}
					onChange={(e) => changeValue(e.target.value, "email")}
				/>
				<Password errors={errors} placeholder={"Senha"} changeValue={changeValue} fieldName="password" />
				<Password errors={errors} placeholder={"Confirme sua senha"} changeValue={changeValue} fieldName="confirmPassword" />
				<button role="submit" className="submit">
					Criar Conta
				</button>
			</form>

			<button className="change-form" onClick={() => setFormName("login")}>
				Voltar para tela de login
			</button>
		</StyledForms>
	);
};
