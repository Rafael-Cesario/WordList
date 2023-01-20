import { StyledTitle } from './styles/styledTitle';

export interface TitleProps {
	props: {
		formName: 'login' | 'create';
		changeFormState: (newState: string) => void;
	};
}

export const Title = ({ props }: TitleProps) => {
	const { changeFormState, formName } = props;

	return (
		<StyledTitle>
			<h1>Criar Conta</h1>

			<button className='close' onClick={() => changeFormState(formName)}>
				x
			</button>
		</StyledTitle>
	);
};
