import { produce } from "immer";
import { useState } from "react";
import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";
import { validations } from "./utils/validations";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { catchErrors } from "@/utils/catchErrors";
import { LoadingButton } from "./components/loading-button";
import { useDispatch } from "react-redux";
import { setNotificationError, setNotificationSuccess } from "@/context/slices/notification-slice";
import { CreateUserResponse, CreateUserInput } from "@/services/interfaces/user";
import { useQueriesUser } from "@/utils/hooks/useQueriesUser";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const CreateAccount = ({ setActiveForm }: Props) => {
	const defaultValues = { email: "", name: "", password: "", passwordCheck: "" };

	const [formData, setFormData] = useState({ ...defaultValues });
	const [formErrors, setFormErrors] = useState({ ...defaultValues });

	const { createUserMutation, createUserLoading } = useQueriesUser();
	const dispatch = useDispatch();

	type IFormKeys = keyof typeof formData;

	const updateValues = (key: IFormKeys, value: string) => {
		const state = produce(formData, (draft) => void (draft[key] = value));
		setFormData(state);
		validate(key, state);
	};

	const validate = (key: IFormKeys, state: typeof formData) => {
		const error = validations[key](state);
		const newState = produce(formErrors, (draft) => void (draft[key] = error));
		setFormErrors(newState);
	};

	const validateAll = () => {
		const formKeys = Object.keys(formData) as IFormKeys[];
		const errors = { ...defaultValues };

		formKeys.forEach((key) => (errors[key] = validations[key](formData)));

		setFormErrors(errors);

		const hasErrors = Object.values(errors).filter((error) => error).length > 0;
		return hasErrors;
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		const hasErrors = validateAll();
		if (hasErrors) return;

		const { email, name, password } = formData;
		const success = await createUserMutation({ createUserData: { email, name, password } });
		if (!success) return;

		dispatch(setNotificationSuccess({ message: `${formData.name}, boas vindas, sua conta foi criada com sucesso.` }));
		setFormData(defaultValues);
		setActiveForm("login");
	};

	return (
		<StyledForm>
			<h1 data-cy="title-create" className="title">
				Criar conta
			</h1>

			<form onSubmit={(e) => submitForm(e)}>
				<Field
					value={formData.email}
					onChange={(newValue: string) => updateValues("email", newValue)}
					label="Email"
					name="email"
					placeholder="Digite seu email"
					type="text"
					error={formErrors.email}
				/>
				<Field
					value={formData.name}
					onChange={(newValue: string) => updateValues("name", newValue)}
					label="Nome"
					name="name"
					placeholder="Digite seu nome"
					type="text"
					error={formErrors.name}
				/>
				<Field
					value={formData.password}
					onChange={(newValue: string) => updateValues("password", newValue)}
					label="Senha"
					name="password"
					placeholder="Digite sua senha"
					type="password"
					error={formErrors.password}
				/>

				<Field
					value={formData.passwordCheck}
					onChange={(newValue: string) => updateValues("passwordCheck", newValue)}
					label="Confirme sua senha"
					name="password-check"
					placeholder="Digite sua senha"
					type="password"
					error={formErrors.passwordCheck}
				/>

				{createUserLoading || (
					<button data-cy="submit-form" className="submit">
						Criar
					</button>
				)}

				{createUserLoading && <LoadingButton className="submit" />}

				<button data-cy="change-form" onClick={() => setActiveForm("login")} className="change-form" type="button">
					Já tem uma conta? Clique aqui para entrar.
				</button>
			</form>
		</StyledForm>
	);
};
