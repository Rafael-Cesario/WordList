import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookies } from '../../services/cookies';
import { login } from '../../services/queries';
import { removeError, sendError } from '../../utils/error';
import { validations } from '../../utils/validations';
import { PasswordInput, TextInput } from './inputs/inputs';
import { StyledForm } from './styledForm';

interface LoginFormProps {
	props: {
		changeFormState: (formName: string) => void;
	};
}

export const LoginForm = ({ props }: LoginFormProps) => {
	const { changeFormState } = props;
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const router = useRouter();

	const submit = async () => {
		const { email, password } = values;

		const emptyValues = validations.emptyFields({ email, password });
		if (emptyValues.length) return emptyValues.forEach(errorMessage => sendError(errorMessage));

		['email', 'password'].forEach(value => removeError(value));

		const response = await login({ email, password });
		if (typeof response.error === 'object') return response.error.forEach(error => sendError(error));

		const token = response.data?.login.token;
		await setCookies(token);

		setValues({});
		router.push('/main');
	};

	return (
		<StyledForm>
			<h1>Login</h1>
			<button onClick={() => changeFormState('login')} className='close'>
				x
			</button>

			<div className='inputs'>
				<TextInput props={{ name: 'email', content: 'Email', values, setValues }} />
				<PasswordInput props={{ name: 'password', content: 'Senha', values, setValues }} />
			</div>

			<button onClick={() => submit()} className='confirm'>
				Login
			</button>
		</StyledForm>
	);
};
