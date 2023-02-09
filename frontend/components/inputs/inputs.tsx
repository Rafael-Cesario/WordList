import produce from "immer";
import Image from "next/image";
import { useState } from "react";
import { StyledInput } from "./styledInput";

type Values = { [key: string]: string };

interface InputsProps {
	props: {
		name: string;
		content: string;
		values: Values;
		setValues: (values: Values) => void;
	};
}

export const TextInput = ({ props }: InputsProps) => {
	const { name, content, values, setValues } = props;

	const changeValue = (input: HTMLInputElement) => {
		const inputValue = input.value;

		const newValues = produce(values, draft => {
			draft[name] = inputValue;
		});

		setValues(newValues);
	};

	return (
		<StyledInput className={name} role={name}>
			<label htmlFor={name} data-name={content}>
				{content}
			</label>
			<input onChange={e => changeValue(e.target)} type='text' value={values[name] || ""} placeholder={content} id={name} required />
		</StyledInput>
	);
};

export const PasswordInput = ({ props }: InputsProps) => {
	const { name, content, values, setValues } = props;
	const [showPassword, setShowPassword] = useState(false);

	const changeValue = (input: HTMLInputElement) => {
		const inputValue = input.value;

		const newValues = produce(values, draft => {
			draft[name] = inputValue;
		});

		setValues(newValues);
	};

	return (
		<StyledInput role={name}>
			<label htmlFor={name} data-name={content}>
				{content}
			</label>
			<input
				onChange={e => changeValue(e.target)}
				type={showPassword ? "text" : "password"}
				value={values[name] || ""}
				placeholder={content}
				id={name}
				required
			/>
			<button className='icon' onClick={() => setShowPassword(!showPassword)}>
				{showPassword && <Image src='/icons/eyeOpen.png' width={20} height={20} alt='icon png' />}
				{showPassword || <Image src='/icons/eyeClose.png' width={20} height={20} alt='icon png' />}
			</button>
		</StyledInput>
	);
};
