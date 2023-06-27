"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	}

	.link {
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
		font-weight: bold;
		padding: 10px 20px;

		&:hover {
			background-color: ${theme.container};
			box-shadow: 5px 5px 5px #00000030;
		}
	}
`;
