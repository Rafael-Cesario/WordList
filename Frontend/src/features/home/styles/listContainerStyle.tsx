"use client";
import { styled } from "styled-components";

export const StyledListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10rem 2rem;
	justify-content: center;

	.lists {
		width: 80%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		justify-items: center;
	}
`;
