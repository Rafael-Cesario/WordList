import { useState } from 'react';
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

	const submit = () => {
		const { email, password } = values;

		const fields = {
			email: validations.email(email),
			password: validations.password(password),
		};

		const hasErrors = verifyValues(fields);
		if (hasErrors) return;

		console.log('sending values');
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
