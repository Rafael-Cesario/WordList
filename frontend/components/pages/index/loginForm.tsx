import { useRouter } from 'next/router';
import { useState } from 'react';
import { queriesUser } from '../../../services/queries/queriesUser';
import { saveCookies } from '../../../utils/saveCookies';
import { validations } from '../../../utils/validations';
import { verifyErrors } from '../../../utils/verifyErrors';
import { PasswordInput, TextInput } from '../../inputs/inputs';
import { StyledForm } from './styles/styledForm';
import { Title } from './title';

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

	const submit = async () => {
		const { email, password } = values;

		const error = findError(email, password);
		if (error) return;

		const response = await queriesUser.login({ email, password });
		if (response.error && response.error.match(/email\/password is wrong/i)) {
			verifyErrors({ email: 'email: Email ou senha incorreta', password: 'password: Email ou senha incorreta' });
			return;
		}

		const user = email;
		const token = response.token;
		saveCookies({ token, user });

		setValues({});
		router.push('/main');
	};

	return (
		<StyledForm>
			<Title props={{ formName: 'login', changeFormState, title: 'Login' }} />

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
