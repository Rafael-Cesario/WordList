import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledConfigs = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: #11111150;
	backdrop-filter: blur(4px);
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		background-color: ${theme.container};
		padding: 4rem;
		border-radius: 2px;
		box-shadow: 5px 5px 5px #11111120;
		border: 3px solid #202020;
		transform: translateY(-20%);
		position: relative;
		width: 60vw;
		max-width: 800px;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
		background-color: transparent;
		font-size: 1rem;
		font-weight: bold;

		&:hover {
			background-color: ${theme.error};
		}
	}

	.title {
		text-align: center;
		margin-bottom: 2rem;
		color: #ddd;
	}

	.main {
		display: flex;
		justify-content: space-between;
	}

	.config-container .config {
		display: flex;
		justify-content: space-between;
		width: 30vw;
		margin: 1rem 2rem 1rem 0;
		max-width: 400px;

		label {
			margin-right: 10px;
			font-weight: 500;
			color: #aaa;
		}

		input {
			background-color: ${theme.background};
			padding: 5px 20px;
			width: 2rem;
			text-align: center;
			color: #ddd;
			font-weight: bold;
		}
	}

	.stats {
		margin: 1rem 0;
		background-color: ${theme.background};
		padding: 1rem;
		color: #aaa;
		text-align: right;
		width: fit-content;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;

		button {
			padding: 0.2rem 3rem;
			font-weight: bold;
			font-size: 0.9rem;

			&:nth-child(2) {
				background-color: ${theme.error};
			}

			&:hover {
				background-color: #ddd;
				color: #333;
			}
		}
	}
`;
