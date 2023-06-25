"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledCreateList = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #11111150;
	backdrop-filter: blur(2px);

	display: flex;
	align-items: center;
	justify-content: center;
	transform: translateY(-10%);

	.container {
		background-color: ${theme.container};
		padding: 4rem;
		position: relative;

		.close {
			position: absolute;
			top: 10px;
			right: 10px;

			&:hover {
				background-color: ${theme.error};
			}
		}

		.title {
			text-align: center;
			font-size: 1.1rem;
			margin-bottom: 2rem;
		}

		.list-name {
			display: block;
			margin-bottom: 2rem;
			background-color: ${theme.background};
			padding: 1rem 2rem;
			min-width: 200px;
			max-width: 1000px;
			width: 40vw;
		}

		.create-button {
			width: 100%;

			&:hover {
				background-color: ${theme.background};
			}
		}
	}
`;
