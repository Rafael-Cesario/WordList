import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledAddWords = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: #11111150;
	backdrop-filter: blur(2px);
	display: flex;
	justify-content: center;
	align-items: center;

	.close {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
		background-color: transparent;
		font-weight: bold;

		&:hover {
			background-color: ${theme.error};
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 2rem 8rem;
		background-color: ${theme.container};
		width: 50vw;
		max-width: 600px;

		.menu {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			flex-direction: column;
			transform: translate(16rem, -5px);

			button {
				margin: 5px;
				padding: 10px 20px;
				width: 15rem;
				text-align: left;
				background-color: ${theme.container};
			}

			.active {
				background-color: ${theme.primary};
			}

			@media (max-width: 1400px) {
				flex-direction: row;
				flex-wrap: wrap;
				transform: translate(0rem, -3.5rem);
			}
		}

		.title {
			text-align: center;
			margin: 2rem 0;
			font-size: 1.1rem;
			font-weight: normal;
		}

		input {
			margin: 1rem 0;
			background-color: ${theme.background};
			padding: 10px 20px;
		}

		.submit {
			margin: 2rem 0;
		}

		textarea {
			resize: none;
			min-height: 20vh;
			border: 5px solid #05050520;
			outline: 5px solid #05050520;
			background-color: ${theme.background};
			color: #ddd;

			&::-webkit-scrollbar {
				cursor: pointer;
				background-color: ${theme.container};
			}

			&::-webkit-scrollbar-thumb {
				background-color: #aaa;
				border-radius: 2px;
			}

			&::-webkit-scrollbar-button {
				background-color: ${theme.container};
			}
		}
	}
`;
