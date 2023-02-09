import styled from "styled-components";

export const StyledDeleteList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.confirm {
		position: absolute;
		background-color: #aa0020;
		font-weight: bold;
		border-radius: 2px;
		padding: 1rem;
		margin-top: 3rem;
		width: 50%;

		h1 {
			text-align: center;
		}

		.choices {
			display: flex;
			justify-content: space-between;
			padding: 1rem;

			button:hover {
				color: black;
			}
		}
	}
`;
