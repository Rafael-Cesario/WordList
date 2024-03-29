"use client";

import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledAuthentication = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	min-height: 100vh;

	.wordList {
		padding: 2rem 4rem;
		background-color: ${theme.primary};
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.title {
			margin-top: -21rem;
			margin-bottom: 2rem;
			height: fit-content;
			background-color: ${theme.background};
			padding: 5px 50px;
			border-radius: 2px;
			box-shadow: 5px 5px 2px #10101020;
		}
	}
`;
