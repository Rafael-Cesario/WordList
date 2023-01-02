import Image from 'next/image';
import { useState } from 'react';
import { StyledLogin } from './styledLogin';

interface LoginFormProps {
	props: {
		changeFormState: (formName: string) => void;
	};
}

export const LoginForm = ({ props }: LoginFormProps) => {
	const { changeFormState } = props;
	const [showPassword, setShowPassword] = useState(false);

	return (
		<StyledLogin>
			<h1>Login</h1>
			<button onClick={() => changeFormState('login')} className='close'>
				x
			</button>

			<div className='inputs'>
				<div className='email'>
					<label htmlFor='email'>Email</label>
					<input type='text' placeholder='Email' id='email' />
				</div>

				<div className='password'>
					<label htmlFor='password'>Senha</label>
					<input type={showPassword ? 'text' : 'password'} placeholder='Senha' id='password' />
					<button className='icon' onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? (
							<Image src='/icons/eyeOpen.png' width={20} height={20} alt='icon png' />
						) : (
							<Image src='/icons/eyeClose.png' width={20} height={20} alt='icon png' />
						)}
					</button>
				</div>
			</div>

			<button className='confirm'>Login</button>
		</StyledLogin>
	);
};
