"use client";

import { theme } from "@/styles/theme";
import styled from "styled-components";

export const StyledNotification = styled.div<{ type: "success" | "error" }>`
	--type: ${({ type }) => (type === "success" ? theme.success : theme.error)};

	position: absolute;
	top: 0;
	left: 0;

	background-color: ${theme.container};
	border-radius: ${theme.radius};
	width: 450px;
	margin: 8px;
	padding: 1rem;
	border-left: 4px solid var(--type);

	.top {
		display: flex;
		justify-content: space-between;

		.title {
			margin-bottom: 8px;
		}

		.close {
			align-self: flex-start;
			background-color: transparent;
			border: none;
			outline: none;
			border-radius: ${theme.radius};
			color: white;
			font-weight: bold;
			padding: 8px 1rem;

			&:hover {
				background-color: ${theme.error};
			}
		}
	}

	.message ::first-letter {
		text-transform: capitalize;
	}
`;
