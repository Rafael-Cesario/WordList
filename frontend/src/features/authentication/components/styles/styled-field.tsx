"use client";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem 0;

	label {
		font-size: 0.8rem;
		padding: 4px 20px;
		margin-bottom: 4px;
	}

	input {
		border: none;
		outline: none;
		padding: 10px 20px;
		border-radius: ${theme.radius};
		background-color: ${theme.container};
		color: ${theme.text};
	}
`;
