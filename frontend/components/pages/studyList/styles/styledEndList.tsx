import styled from 'styled-components';

export const StyledEndList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	max-width: 1000px;

	h1 {
		margin: 2rem 0;
	}

	button {
		margin: 2rem 0;
		padding: 0.5rem 1rem;
		background-color: #005090;
		border-radius: 2px;
	}

	.words {
		margin: 2rem;
		background-color: #151515;
		padding: 2rem;
		border-radius: 2px;
		width: 100%;

		.word {
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			p:first-child {
				margin-right: 1rem;
			}

			p {
				background-color: #101010;
				padding: 0.5rem 1rem;
				border-radius: 2px;
				margin: 0.2rem 0;
				width: 45%;
			}
		}
	}
`;
