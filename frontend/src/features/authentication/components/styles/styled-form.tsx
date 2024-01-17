"use client";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	justify-content: center;
	align-items: center;

	.title {
		margin-bottom: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 300px;
		min-width: 250px;
	}

	button {
		padding: 10px 20px;
		border: none;
		outline: none;
	}

	.submit {
		background-color: ${theme.primary};
		border-radius: ${theme.radius};
		margin-top: 2rem;
		color: white;
		font-weight: bold;
	}

	.change-form {
		margin: 4px 0;
		background-color: transparent;
		color: ${theme.text + "50"};
		font-size: 0.8rem;

		&:hover {
			color: ${theme.text};
		}
	}
`;
