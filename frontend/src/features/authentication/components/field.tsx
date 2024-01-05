import { StyledField } from "./styles/styled-field";

interface Props {
	name: string;
	type: "text" | "password";
	placeholder: string;
	label: string;
}

export const Field = ({ name, type, label, placeholder }: Props) => {
	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>
			<input id={name} type={type} placeholder={placeholder} />
		</StyledField>
	);
};
