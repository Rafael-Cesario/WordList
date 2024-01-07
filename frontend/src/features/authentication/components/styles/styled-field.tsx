"use client";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem 0;

	.container {
		display: flex;
		align-items: center;

		border-radius: ${theme.radius};
		background-color: ${theme.container};

		.icon {
			padding: 4px 12px;
			font-size: 0.7rem;
			user-select: none;
			cursor: pointer;
		}
	}

	label {
		font-size: 0.8rem;
		padding: 4px 20px;
		margin-bottom: 4px;
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		padding: 10px 20px;
		color: ${theme.text};
		background-color: transparent;
	}
`;
