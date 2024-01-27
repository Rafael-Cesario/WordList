"use client";
import { Field } from "./components/field";
import { StyledForm } from "./components/styles/styled-form";
import { useState } from "react";
import { produce } from "immer";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { LoadingButton } from "./components/loading-button";
import { catchErrors } from "@/utils/catchErrors";
import { useDispatch } from "react-redux";
import { setNotificationError } from "@/context/slices/notification-slice";
import { userCookies } from "@/services/cookies";
import { useRouter } from "next/navigation";
import { LoginResponse, LoginInput } from "@/services/interfaces/user";

interface Props {
	setActiveForm(form: "login" | "create"): void;
}

export const Login = ({ setActiveForm }: Props) => {
	const defaultValues = { email: "", password: "" };
	type FormKeys = keyof typeof defaultValues;

	const [formData, setFormData] = useState({ ...defaultValues });
	const [formErrors, setFormErrors] = useState({ ...defaultValues });
	const router = useRouter();

	const [loginMutation, { loading }] = useMutation<LoginResponse, LoginInput>(userQueries.LOGIN);
	const dispatch = useDispatch();

	const updateValue = (key: FormKeys, value: string) => {
		const newState = produce(formData, (draft) => void (draft[key] = value));
		setFormData(newState);
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		const hasEmptyValues = emptyValues();
		if (hasEmptyValues) return;

		const success = await login();
		if (!success) return;

		setFormData({ ...defaultValues });
		router.refresh();
	};

	const emptyValues = () => {
		const entries = Object.entries(formData);
		const errors = { ...defaultValues };
		let hasEmpty = false;

		entries.forEach(([key, value]) => {
			if (value) return;

			hasEmpty = true;
			errors[key as FormKeys] = "Este campo não pode ficar vazio.";
		});

		setFormErrors(errors);
		return hasEmpty;
	};

	const login = async () => {
		try {
			const { data } = await loginMutation({ variables: { loginData: formData } });
			if (!data) throw new Error("Server didn't return data");
			await userCookies.set(data.login);
		} catch (error: any) {
			const message = catchErrors(error.message, "user");
			dispatch(setNotificationError({ message }));
			return false;
		}

		return true;
	};

	return (
		<StyledForm>
			<h1 className="title" data-cy="title-login">
				Login
			</h1>

			<form onSubmit={(e) => submitForm(e)}>
				<Field
					value={formData.email}
					error={formErrors.email}
					onChange={(value: string) => updateValue("email", value)}
					label="Email"
					name="email"
					placeholder="Digite seu email"
					type="text"
				/>

				<Field
					value={formData.password}
					error={formErrors.password}
					onChange={(value: string) => updateValue("password", value)}
					label="Senha"
					name="password"
					placeholder="Digite sua senha"
					type="password"
				/>

				{loading || (
					<button data-cy="submit-form" className="submit">
						Entrar
					</button>
				)}

				{loading && <LoadingButton className="submit" />}

				<button data-cy="change-form" onClick={() => setActiveForm("create")} className="change-form" type="button">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledForm>
	);
};
