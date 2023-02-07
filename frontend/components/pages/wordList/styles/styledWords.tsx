import styled from 'styled-components';

export const StyledWordsContainer = styled.div`
	background-color: #151515;
	margin: 2rem;
	padding: 2rem;
	width: 80%;
	max-width: 1000px;
	display: flex;
	flex-direction: column-reverse;
	position: relative;

	.word {
		display: flex;
		justify-content: space-between;

		p {
			margin: 0.5rem;
			width: 50%;
			padding: 0.5rem;
			border-radius: 2px;
			text-transform: capitalize;
			background-color: #101010;
			overflow: hidden;
		}
	}
`;
