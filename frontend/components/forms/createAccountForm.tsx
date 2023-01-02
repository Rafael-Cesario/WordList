import { PasswordInput, TextInput } from './inputs/inputs';
import { StyledForm } from './styledForm';

interface CreateAccountProps {
	props: {
		changeFormState: (formName: string) => void;
	};
}

export const CreateAccountForm = ({ props }: CreateAccountProps) => {
	const { changeFormState } = props;

	return (
		<StyledForm>
			<h1>Criar Conta</h1>
			<button className='close' onClick={() => changeFormState('create')}>
				x
			</button>

			<div className='inputs'>
				<TextInput props={{ name: 'email', content: 'Email' }} />
				<TextInput props={{ name: 'name', content: 'Nome' }} />
				<PasswordInput props={{ name: 'password', content: 'Senha' }} />
				<PasswordInput props={{ name: 'confirmPassword', content: 'Confirme sua senha' }} />
			</div>

			<button className='confirm'>Criar Conta</button>
		</StyledForm>
	);
};
