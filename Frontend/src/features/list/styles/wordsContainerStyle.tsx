import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledWordsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${theme.container};
	margin: 4rem;
	padding: 2rem;
	border-radius: 2px;

	.group {
		display: flex;
		flex-wrap: wrap;
		background-color: ${theme.background};
		margin: 1rem 0;
	}
`;
