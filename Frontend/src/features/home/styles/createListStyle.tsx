import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledCreateList = styled.div`
	position: absolute;
	top: 0;
	right: 0;

	width: 100%;
	padding: 2rem 4rem;
	margin: 3rem 0;
	border-radius: 2px;
	background-color: ${theme.container};
	border: 4px solid #11111120;
	box-shadow: 0 10px 4px #11111110;

	display: flex;
	flex-direction: column;

	animation: show 0.3s;

	@keyframes show {
		from {
			transform: translateY(-1rem);
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.name {
		margin-bottom: 2rem;
		background-color: ${theme.background};
		padding: 5px 10px;
	}

	.create {
		background-color: #ddd;
		color: #111;

		&:hover {
			background-color: #111;
			color: #ddd;
		}
	}
`;
