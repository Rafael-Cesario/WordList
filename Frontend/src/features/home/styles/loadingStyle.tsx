"use client";
import { styled } from "styled-components";

export const StyledLoading = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 1000px;

	.loading {
		width: 300px;
		height: 80px;
		background-color: white;
		border-radius: 2px;
		margin: 1rem;
		opacity: 10%;
	}
`;
