"use client";
import { styled } from "styled-components";

export const StyledWordList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

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
