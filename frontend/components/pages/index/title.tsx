import { StyledTitle } from "./styles/styledTitle";

export interface TitleProps {
	props: {
		title: string;
		formName: "login" | "create";
		changeFormState: (newState: string) => void;
	};
}

export const Title = ({ props }: TitleProps) => {
	const { title, changeFormState, formName } = props;

	return (
		<StyledTitle>
			<h1 role={"form-title"}>{title}</h1>

			<button role={"close-form"} className='close' onClick={() => changeFormState(formName)}>
				x
			</button>
		</StyledTitle>
	);
};
