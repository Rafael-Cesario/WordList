import { PasswordInput, TextInput } from '../inputs/inputs';
import { StyledLogin } from './styledLogin';

interface LoginFormProps {
	props: {
		changeFormState: (formName: string) => void;
	};
}

export const LoginForm = ({ props }: LoginFormProps) => {
	const { changeFormState } = props;

	return (
		<StyledLogin>
			<h1>Login</h1>
			<button onClick={() => changeFormState('login')} className='close'>
				x
			</button>

			<div className='inputs'>
				<TextInput props={{ name: 'email' }} />
				<PasswordInput />
			</div>

			<button className='confirm'>Login</button>
		</StyledLogin>
	);
};
