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
			font-size: 0.8rem;
			font-weight: bold;
			color: #ddd;
			border-radius: 2px;
			padding: 5px 10px;
			background-color: ${theme.background};
			margin: 5px;
		}
	}

	.save {
		position: fixed;
		top: 0;
		right: 0;
		margin: 1rem;
		font-size: 1rem;
		font-weight: bold;
		padding: 1rem 5rem;
		background-color: ${theme.error};
		box-shadow: 10px 10px 10px #11111120;
		border: 1px solid #703030;
		border-radius: 2px;

		&:hover {
			background-color: ${theme.container};
			border: 1px solid #202020;
		}
	}
`;
