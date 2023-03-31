import styled from 'styled-components';

export const StyledDeleteList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.confirm {
		position: absolute;
		background-color: #bd3737;
		border-radius: 0.2rem;
		box-shadow: 2px 2px 2px #00000020;
		padding: 2rem;

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
