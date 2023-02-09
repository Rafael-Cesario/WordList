import styled from "styled-components";

export const StyledLists = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 20vw;

	button {
		text-transform: capitalize;
		width: 15rem;
		height: 5rem;
		margin: 1rem;
		border-radius: 5px;
		background-color: #005090;
		font-weight: bold;
		padding: 1rem;
		transition: 0.1s;

		:hover {
			transform: scale(1.05);
		}
	}
`;
