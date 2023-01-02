import Image from 'next/image';
import { useState } from 'react';
import { StyledInput } from './styledInput';

interface InputsProps {
	props: {
		name: string;
		content: string;
	};
}

export const TextInput = ({ props }: InputsProps) => {
	const { name, content } = props;

	return (
		<StyledInput className={name}>
			<label htmlFor={name}>{content}</label>
			<input type='text' placeholder={content} id={name} required />
		</StyledInput>
	);
};

export const PasswordInput = ({ props }: InputsProps) => {
	const { name, content } = props;
	const [showPassword, setShowPassword] = useState(false);

	return (
		<StyledInput>
			<label htmlFor={name}>{content}</label>
			<input type={showPassword ? 'text' : 'password'} placeholder={content} id={name} required />
			<button className='icon' onClick={() => setShowPassword(!showPassword)}>
				{showPassword && <Image src='/icons/eyeOpen.png' width={20} height={20} alt='icon png' />}
				{showPassword || <Image src='/icons/eyeClose.png' width={20} height={20} alt='icon png' />}
			</button>
		</StyledInput>
	);
};
