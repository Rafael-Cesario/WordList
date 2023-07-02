"use client";
import { styled } from "styled-components";

export const StyledWordList = styled.div`
	display: flex;
	justify-content: center;

	a {
		margin: 2rem;
		color: #aaa;
		text-decoration: none;
		font-weight: bold;

		&:hover {
			color: #ddd;
		}
	}
`;
