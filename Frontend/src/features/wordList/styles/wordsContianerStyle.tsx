"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledWordsContainer = styled.div`
	border-top: 1rem solid ${theme.primary};
	margin: 4rem;
	background-color: ${theme.container};
	padding: 1rem;
	border-radius: 2px;
	width: 100%;
	max-width: 90vw;

	.group {
		display: grid;
		grid-template-columns: 1fr 2fr;

		.word {
			border-radius: 2px;
			padding: 5px 10px;
			background-color: ${theme.background};
			margin: 5px;
		}
	}
`;
