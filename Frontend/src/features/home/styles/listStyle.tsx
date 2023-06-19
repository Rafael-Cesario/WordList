import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledList = styled.div`
	width: 250px;
	height: 80px;
	margin: 1rem;
	border-radius: 2px;
	border-left: 10px solid ${theme.primary};
	background-color: ${theme.container};
	box-shadow: 0 10px 2px #11111150;
	display: flex;
	align-items: center;
	padding-left: 2rem;
	text-transform: capitalize;
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		transform: scale(1.05);
	}
`;
