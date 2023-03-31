import { StyledWordListContainer } from './styles/styledWordListContainer';

interface PropsEmptyList {
	props: {
		status: [string, string];
	};
}

export const Emptylist = ({ props: { status } }: PropsEmptyList) => {
	return (
		<StyledWordListContainer>
			<h1>{status[0]}</h1>
			<p role='empty-list-message'>Você ainda não tem nenhuma lista com este status</p>
		</StyledWordListContainer>
	);
};
