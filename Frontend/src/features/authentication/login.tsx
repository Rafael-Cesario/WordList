import { FormEvent, SetStateAction, useContext, useState } from "react";
import { StyledForms } from "./styles/formsStyle";
import { Password } from "./password";
import { produce } from "immer";
import { Fields } from "./createAccount";
import { checkForEmptyValues } from "@/utils/checkForEmptyValues";
import { useQueriesUser } from "../../hooks/useQueriesUser";
import { NotificationContext } from "@/context/notification";
import { createCookie } from "@/services/cookies";
import { useRouter } from "next/navigation";
import { UserCookies } from "@/services/interfaces/cookies";

interface ILogin {
	props: {
		setFormName: React.Dispatch<SetStateAction<"login" | "create">>;
	};
}

const defaultValues = {
	email: "",
	password: "",
};

export const Login = ({ props: { setFormName } }: ILogin) => {
	const [values, setValues] = useState(defaultValues);
	const [errors, setErrors] = useState(defaultValues);
	const router = useRouter();

	const { requestLogin } = useQueriesUser();
	const { setNotificationValues } = useContext(NotificationContext);

	const changeValue = (newValue: string, fieldName: keyof Fields) => {
		const newState = produce(values, (draft) => {
			draft[fieldName as keyof typeof draft] = newValue;
		});

		setValues(newState);
	};

	const submitForm = async (e: FormEvent) => {
		e.preventDefault();

		const emptyValues = checkForEmptyValues(values);
		const hasEmptyValues = Object.keys(emptyValues).length;
		if (hasEmptyValues) return setErrors({ ...defaultValues, ...emptyValues });

		const { user, error } = await requestLogin({ login: values });
		if (error) return setNotificationValues({ isOpen: true, message: error, title: "Ops, Erro", type: "error" });

		const userCookie = { email: values.email, ...user } as UserCookies;
		const expires = new Date();

		expires.setDate(expires.getDate() + 7);

		createCookie("user", userCookie, expires);
		router.push("/");
		setNotificationValues({ isOpen: true, message: "Login efetuado com sucesso, boas vindas.", title: "Login efetuado", type: "success" });
	};

	return (
		<StyledForms>
			<h1 className="title">Login</h1>

			<form onSubmit={(e) => submitForm(e)} className="fields">
				<label role="email-label" className="label-error">
					{errors.email}
				</label>
				<input
					role="email-input"
					className={errors.email ? "error" : ""}
					onChange={(e) => changeValue(e.target.value, "email")}
					autoFocus={true}
					type="text"
					placeholder="Email"
				/>
				<Password changeValue={changeValue} errors={errors} fieldName="password" placeholder="Senha" />
				<button role="submit" className="submit">
					Entrar
				</button>
			</form>

			<button className="change-form" onClick={() => setFormName("create")}>
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForms>
	);
};
