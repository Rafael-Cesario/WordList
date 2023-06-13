"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledForms = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem 4rem;
	margin-top: -10rem;
	align-items: center;
	justify-content: center;

	.title {
		text-align: center;
		margin-bottom: 2rem;
	}

	.fields {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 400px;

		input,
		button {
			padding: 10px 20px;
			margin-bottom: 2rem;
		}

		.submit {
			background-color: ${theme.primary};

			&:hover {
				background-color: ${theme.container};
			}
		}
	}

	.change-form {
		background-color: transparent;
		opacity: 50%;

		&:hover {
			opacity: 1;
		}
	}

	.password-input {
		display: flex;
		justify-content: space-between;
		background-color: ${theme.container};
		margin-bottom: 2rem;

		input {
			width: 100%;
			margin: 0;
		}

		.input-icon {
			padding: 8.5px;
			cursor: pointer;
		}
	}
`;
