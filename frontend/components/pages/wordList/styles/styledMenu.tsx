import styled from "styled-components";

export const StyledMenu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: fit-content;
	margin: 5rem 0;
	width: 100%;

	button {
		max-width: 500px;
		width: 50%;
		background-color: #005090;
		margin: 0.5rem 0;
		padding: 0.5rem 2rem;
		border-radius: 2px;
		transition: 0.2s;

		:hover {
			transform: scale(1.05);
		}
	}
`;
