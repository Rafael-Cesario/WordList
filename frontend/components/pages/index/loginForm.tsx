import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookies } from '../../../services/cookies';
import { queriesUser } from '../../../services/queries/queriesUser';
import { validations } from '../../../utils/validations';
import { verifyErrors } from '../../../utils/verifyErrors';
import { PasswordInput, TextInput } from '../../inputs/inputs';
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

	const findError = (email: string, password: string) => {
		const emptyValues = validations.emptyFields({ email, password });
		const error = verifyErrors(emptyValues);
		return error;
	};

	const saveCookies = async (tokens: { [key: string]: string }) => {
		const entries = Object.entries(tokens);

		entries.forEach(async ([key, value]) => {
			await setCookies(key, value);
		});
	};

	const submit = async () => {
		const { email, password } = values;

		const error = findError(email, password);
		if (error) return;

		const response = await queriesUser.login({ email, password });
		if (response.error.match(/email\/password is wrong/i)) {
			verifyErrors({ email: 'Email ou senha incorreta', password: 'Email ou senha incorreta' });
			return;
		}

		const token = response.data?.login.token;
		const user = email;
		saveCookies({ token, user });

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
