import Image from "next/image";
import { useState } from "react";
import { Fields } from "./createAccount";

interface PasswordProps {
	placeholder: string;
	changeValue: (value: string, fieldName: keyof Fields) => void;
	fieldName: "password" | "confirmPassword";
	errors: object;
}

export const Password = ({ placeholder, changeValue, fieldName, errors }: PasswordProps) => {
	const [isPasswordHide, setIsPasswordHide] = useState(true);

	return (
		<div key={fieldName} className={`password-input ${errors[fieldName as keyof typeof errors] ? "error" : ""}`}>
			<label htmlFor={fieldName + "input"} role={fieldName + "-label"} className="label-error">
				{errors[fieldName as keyof typeof errors]}
			</label>
			<input
				id={fieldName + "input"}
				role="password"
				type={isPasswordHide ? "password" : "text"}
				placeholder={placeholder}
				onChange={(e) => changeValue(e.target.value, fieldName)}
			/>
			<Image
				onClick={() => setIsPasswordHide(!isPasswordHide)}
				className="input-icon"
				src={`/icons/${isPasswordHide ? "eye_close" : "eye_open"}.png`}
				alt="eye closed"
				width={16}
				height={16}
				role="eye-icon"
			/>
		</div>
	);
};
