import { StyledListContainer } from "./styles/styledListContainer";

interface PropsEmptyList {
	props: {
		status: string;
	};
}

export const Emptylist = ({ props: { status } }: PropsEmptyList) => {
	return (
		<StyledListContainer>
			<h1>{status}</h1>
			<p>Você ainda não tem nenhuma lista com este status</p>
		</StyledListContainer>
	);
};
