import Image from "next/image";
import { useState } from "react";

interface PasswordProps {
	placeholder: string;
}

export const Password = ({ placeholder }: PasswordProps) => {
	const [isPasswordHide, setIsPasswordHide] = useState(true);

	return (
		<div className="password-input">
			<input type={isPasswordHide ? "password" : "text"} placeholder={placeholder} />
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
