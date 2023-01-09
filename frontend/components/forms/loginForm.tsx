import { useRouter } from 'next/router';
import { useState } from 'react';
import { login } from '../../services/queries';
import { validations } from '../../utils/validations';
import { verifyValues } from '../../utils/verifyValues';
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

		const fields = {
			email: validations.email(email),
			password: validations.password(password),
		};

		const hasErrors = verifyValues(fields);
		if (hasErrors) return;

		console.log('Doing Login');
		const response = await login({ email, password });
		console.log({ response });

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
