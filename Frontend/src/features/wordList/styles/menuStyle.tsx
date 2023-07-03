import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledMenu = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4rem;
	width: 90vw;
	max-width: 900px;

	.buttons {
		display: flex;
		justify-content: flex-end;

		a {
			background-color: ${theme.primary};
			color: #ddd;
		}

		button,
		a {
			margin: 0;
			padding: 10px 40px;
			font-weight: bold;
			font-size: 0.8rem;

			&:nth-child(2) {
				margin-left: 1rem;
				background-color: ${theme.container};
			}

			&:hover {
				background-color: ${theme.container};
				color: #ddd;
			}
		}
	}

	.search {
		padding: 1rem 2rem;
		font-size: 0.9rem;
		font-weight: bold;
		border-left: 0.5rem solid ${theme.primary};
	}

	.line {
		width: 100%;
		height: 1rem;
		background-color: ${theme.primary};
	}

	.buttons button,
	.buttons a,
	.search {
		margin-bottom: 2rem;
	}
`;
