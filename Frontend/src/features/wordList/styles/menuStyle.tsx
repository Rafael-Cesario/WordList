import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledMenu = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4rem;

	.buttons button,
	.search {
		margin-bottom: 2rem;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;

		button {
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
		width: 50vw;
	}

	.line {
		width: 100%;
		height: 1rem;
		background-color: ${theme.primary};
	}
`;