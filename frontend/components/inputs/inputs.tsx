import Image from 'next/image';
import { useState } from 'react';
import { StyledInput } from './styledInput';

interface TextInputProps {
	props: {
		name: string;
	};
}

export const TextInput = ({ props }: TextInputProps) => {
	const { name } = props;
	return (
		<StyledInput className={name}>
			<label htmlFor={name}>Email</label>
			<input type='text' placeholder={name} id={name} />
		</StyledInput>
	);
};

export const PasswordInput = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<StyledInput>
			<label htmlFor='password'>Senha</label>
			<input type={showPassword ? 'text' : 'password'} placeholder='Senha' id='password' />
			<button className='icon' onClick={() => setShowPassword(!showPassword)}>
				{showPassword && <Image src='/icons/eyeOpen.png' width={20} height={20} alt='icon png' />}
				{showPassword || <Image src='/icons/eyeClose.png' width={20} height={20} alt='icon png' />}
			</button>
		</StyledInput>
	);
};
