"use client";
import { styled } from "styled-components";
import { theme } from "./theme";

export const StyledNotification = styled.div<{ type: "success" | "error" }>`
	position: absolute;
	background-color: ${theme.container};
	border-left: 10px solid ${({ type }) => (type === "success" ? theme.success : theme.error)};
	margin: 1rem;
	padding: 1rem 3rem 1rem 1rem;
	border-radius: 2px;
	box-shadow: 10px 10px 2px #11111110;
	left: 0;
	top: 0;
	width: 400px;
	z-index: 1;

	.close {
		position: absolute;
		right: 0;
		top: 0;
		font-weight: bold;
		font-size: 1.1rem;
		background-color: transparent;

		&:hover {
			background-color: crimson;
		}
	}

	.title {
		font-size: 1.1rem;
		margin-bottom: 5px;
		font-weight: bold;
		color: ${({ type }) => (type === "success" ? theme.success : theme.error)};
	}

	.description {
		font-size: 0.9rem;
		font-weight: normal;
		color: #aaa;
	}
`;
