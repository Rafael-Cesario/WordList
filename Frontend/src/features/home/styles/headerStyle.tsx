"use client";
import { styled } from "styled-components";

export const StyledHeader = styled.div`
	margin: 2rem;
	display: flex;
	justify-content: space-between;

	.title {
		font-weight: bold;
	}

	.menu {
		position: relative;

		button {
			font-size: 0.9rem;
			font-weight: bold;
		}

		button:nth-child(1) {
			background-color: transparent;
		}

		button:nth-child(2) {
			padding: 5px 50px;
		}
	}
`;
