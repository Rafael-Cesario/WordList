import Image from "next/image";
import { useState } from "react";
import { Fields } from "./createAccount";

interface PasswordProps {
	placeholder: string;
	changeValue: (value: string, fieldName: "password" | "confirmPassword") => void;
	fieldName: "password" | "confirmPassword";
	errors: Fields;
}

export const Password = ({ placeholder, changeValue, fieldName, errors }: PasswordProps) => {
	const [isPasswordHide, setIsPasswordHide] = useState(true);

	return (
		<div key={fieldName} className={`password-input ${errors[fieldName] ? "error" : ""}`}>
			<label className="label-error">{errors[fieldName]}</label>
			<input type={isPasswordHide ? "password" : "text"} placeholder={placeholder} onChange={(e) => changeValue(e.target.value, fieldName)} />
			<Image
				onClick={() => setIsPasswordHide(!isPasswordHide)}
				className="input-icon"
				src={`/icons/${isPasswordHide ? "eye_close" : "eye_open"}.png`}
				alt="eye closed"
				width={16}
				height={16}
			/>
		</div>
	);
};
