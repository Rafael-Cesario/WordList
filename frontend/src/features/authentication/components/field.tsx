"use client";
import { useState } from "react";
import { StyledField } from "./styles/styled-field";
import { LuEye, LuEyeOff } from "react-icons/lu";

type IFieldType = "text" | "password";

interface Props {
	name: string;
	type: IFieldType;
	placeholder: string;
	label: string;
	error: string;
	onChange(newValue: string): void;
}

interface IPasswordButtonProps {
	props: {
		fieldType: IFieldType;
		setFieldType(state: IFieldType): void;
	};
}

export const Field = ({ name, type, label, placeholder, onChange, error }: Props) => {
	const [fieldType, setFieldType] = useState(type);

	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>
			<div className="container">
				<input onChange={(e) => onChange(e.target.value.trim())} data-cy={name + "-input"} id={name} type={fieldType} placeholder={placeholder} />
				{type === "password" && <PasswordButton props={{ fieldType, setFieldType }} />}
			</div>
			<span data-cy={name + "-error"} className="error">
				{error}
			</span>
		</StyledField>
	);
};

const PasswordButton = ({ props: { fieldType, setFieldType } }: IPasswordButtonProps) => {
	return (
		<>
			{fieldType === "password" && (
				<span data-cy="show-password" className="icon" onClick={() => setFieldType("text")}>
					<LuEyeOff title="Mostrar" />
				</span>
			)}

			{fieldType === "text" && (
				<span data-cy="hide-password" className="icon" onClick={() => setFieldType("password")}>
					<LuEye title="Esconder" />
				</span>
			)}
		</>
	);
};
