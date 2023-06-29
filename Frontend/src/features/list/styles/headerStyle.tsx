"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledHeader = styled.header`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	align-items: center;
	justify-items: center;
	margin: 2rem;

	.title {
		h1 {
			font-size: 1.1rem;
			text-align: center;
		}

		p {
			opacity: 80%;
			font-size: 0.9rem;
			font-weight: 300;
		}

		.loading {
			width: 20vw;
			height: 1rem;
			border-radius: 2px;
			background-color: white;
			opacity: 10%;
			margin-bottom: 5px;
			animation: loading 0.2s ease-out;

			@keyframes loading {
				from {
					opacity: 0;
					transform: scale(0.5);
				}
			}
		}
	}

	.link {
		justify-self: start;
		color: #aaa;
		text-decoration: none;
		font-weight: bold;
		height: fit-content;
		padding: 5px 20px;

		&:hover {
			color: white;
		}
	}

	.add-words-button {
		justify-self: end;
		font-weight: bold;
		padding: 10px 20px;

		&:hover {
			background-color: ${theme.container};
			box-shadow: 5px 5px 5px #00000030;
		}
	}
`;
