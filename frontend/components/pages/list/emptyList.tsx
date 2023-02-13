import { StyledWordListContainer } from "./styles/styledWordListContainer";

interface PropsEmptyList {
	props: {
		status: string;
	};
}

export const Emptylist = ({ props: { status } }: PropsEmptyList) => {
	return (
		<StyledWordListContainer>
			<h1>{status}</h1>
			<p>Você ainda não tem nenhuma lista com este status</p>
		</StyledWordListContainer>
	);
};
