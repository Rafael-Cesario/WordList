"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledList = styled.div`
	margin: 1rem;
	border-radius: 2px;
	border-left: 10px solid ${theme.primary};
	background-color: ${theme.container};
	box-shadow: 0 10px 2px #11111150;
	display: flex;
	align-items: center;
	text-transform: capitalize;
	cursor: pointer;
	transition: 0.3s;
	user-select: none;

	.listName,
	.editable {
		width: 300px;
		padding: 1.5rem 1rem;
		font-weight: bold;
		font-size: 1rem;
	}

	.editable {
		color: #666;
		font-size: 1.1rem;
	}

	.menu {
		position: absolute;
		transform: translate(2.3rem, -3.5rem);
		display: flex;
		animation: show 0.2s ease-out;

		.option {
			margin: 5px;
			background-color: ${theme.primary};
			padding: 5px 20px;
			font-weight: bold;

			&:nth-child(3) {
				background-color: ${theme.error};
			}

			&:hover {
				background-color: ${theme.container};
			}
		}
	}

	@keyframes show {
		from {
			opacity: 0;
			transform: translate(2.3rem, -2rem);
			z-index: -1;
		}

		to {
			opacity: 1;
		}
	}

	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;

		backdrop-filter: blur(10px);
		background-color: ${theme.background + "50"};
		border-radius: 2px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.delete {
			position: relative;
			background-color: ${theme.container};
			padding: 10rem 4rem;
			border-radius: 4px;
			overflow: hidden;
			max-width: 300px;
			border: 2px solid #171717;
		}

		.line {
			position: absolute;
			width: 100%;
			height: 28px;
			top: 0;
			left: 0;
			background-color: ${theme.primary};
			box-shadow: 0 10px 5px #11111110;
		}

		.close {
			position: absolute;
			top: 0;
			right: 0;
			padding: 5px 1rem;
			font-size: 1rem;
			border-radius: 0;
			background-color: transparent;

			&:hover {
				background-color: ${theme.error};
			}
		}

		.title {
			font-size: 1.1rem;
			margin-bottom: 1rem;
			text-transform: none;
		}

		.text {
			text-transform: none;
			margin-bottom: 0.5rem;
			font-weight: 400;
			color: #bbb;
			font-size: 0.85rem;
		}

		.delete {
			label {
				display: block;
				margin: 2rem 1rem 5px 0rem;
			}

			input {
				margin-bottom: 3rem;
				display: block;
				background-color: ${theme.background};
				padding: 10px 20px;
				border-radius: 2px;
				width: 85%;
			}
		}

		.submit {
			background-color: ${theme.error};
			width: 100%;
			font-weight: bold;
			box-shadow: 0 10px 5px #11111120;
		}
	}
`;
