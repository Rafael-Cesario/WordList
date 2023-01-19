import { useState } from 'react';
import { queriesUser } from '../../../services/queries/queriesUser';
import { validations } from '../../../utils/validations';
import { verifyErrors } from '../../../utils/verifyErrors';
import { PasswordInput, TextInput } from '../../inputs/inputs';
import { StyledForm } from './styledForm';

interface CreateAccountProps {
	props: {
		changeFormState: (formName: string) => void;
	};
}

export const CreateAccountForm = ({ props }: CreateAccountProps) => {
	const { changeFormState } = props;
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const [showNotification, setShowNotification] = useState(false);

	const submit = async () => {
		const { email, name, password, confirmPassword } = values;

		const fields = {
			email: validations.email(email),
			name: validations.name(name),
			password: validations.password(password),
			confirmPassword: validations.confirmPassword(password, confirmPassword),
		};

		const hasErrors = verifyErrors(fields);
		if (hasErrors) return;

		const user = { email, name, password };
		await queriesUser.createUser(user);

		setShowNotification(true);
		setValues({});

		setTimeout(() => {
			setShowNotification(false);
		}, 5000);
	};

	return (
		<StyledForm>
			<h1>Criar Conta</h1>
			<button className='close' onClick={() => changeFormState('create')}>
				x
			</button>

			<div className='inputs'>
				<TextInput props={{ name: 'email', content: 'Email', values, setValues }} />
				<TextInput props={{ name: 'name', content: 'Nome', values, setValues }} />
				<PasswordInput props={{ name: 'password', content: 'Senha', values, setValues }} />
				<PasswordInput props={{ name: 'confirmPassword', content: 'Confirme sua senha', values, setValues }} />
			</div>

			<button onClick={() => submit()} className='confirm'>
				Criar Conta
			</button>

			{showNotification && (
				<h1 className='notification' role={'message'}>
					Uma nova conta foi criada
				</h1>
			)}
		</StyledForm>
	);
};
