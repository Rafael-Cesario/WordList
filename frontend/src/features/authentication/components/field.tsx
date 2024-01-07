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
}

interface IPasswordButtonProps {
	props: {
		fieldType: IFieldType;
		setFieldType(state: IFieldType): void;
	};
}

export const Field = ({ name, type, label, placeholder }: Props) => {
	const [fieldType, setFieldType] = useState(type);

	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>
			<div className="container">
				<input id={name} type={fieldType} placeholder={placeholder} />
				{type === "password" && <PasswordButton props={{ fieldType, setFieldType }} />}
			</div>
		</StyledField>
	);
};

const PasswordButton = ({ props: { fieldType, setFieldType } }: IPasswordButtonProps) => {
	return (
		<>
			{fieldType === "password" && (
				<span className="icon" onClick={() => setFieldType("text")}>
					<LuEyeOff title="Mostrar" />
				</span>
			)}

			{fieldType === "text" && (
				<span className="icon" onClick={() => setFieldType("password")}>
					<LuEye title="Esconder" />
				</span>
			)}
		</>
	);
};
