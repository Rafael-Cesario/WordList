"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledQuestion = styled.div<{ isCorrect?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		text-decoration: none;
		color: #aaa;
		font-weight: bold;
		margin: 2rem;

		&:hover {
			color: #ddd;
		}
	}

	.container {
		background-color: ${theme.container};
		padding: 4rem;
		width: 70vw;
		max-width: 800px;
		border-radius: 2px;
		box-shadow: 10px 10px 10px #11111120;
		border: 1px solid #20202080;
		margin-top: 5rem;

		.question,
		.answer {
			margin-bottom: 1rem;
			text-transform: capitalize;
		}

		.question {
			font-size: 1.2rem;
		}

		.answer {
			font-size: 1rem;
			color: ${({ isCorrect }) => (isCorrect ? theme.success : theme.error)};
			opacity: 0;
		}

		#answer {
			width: 90%;
			background-color: ${theme.background};
			padding: 1rem 2rem;
			font-weight: bold;
			font-size: 0.9rem;
			margin: 2rem 0;
		}

		.buttons {
			margin: 1rem 0;

			button {
				transition: 0.1s;
				border: 2px solid transparent;

				&:nth-child(1) {
					margin-right: 10px;
				}

				&:nth-child(2) {
					background-color: ${theme.background};
					border: 2px solid #202020;
					opacity: 0;
				}
			}

			button.active {
				opacity: 1;
			}
		}

		.words-left {
			font-size: 0.9rem;
			margin-top: 2rem;
			color: #555;
		}

		.active {
			opacity: 1;
		}
	}

	.title-end {
		margin-top: 5rem;
		margin-bottom: 1rem;
	}

	.button-end {
		padding: 10px 4rem;
		font-size: 0.8rem;
	}
`;
