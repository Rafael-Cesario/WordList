import styled from 'styled-components';

export const StyledWordList = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
	background-color: #005090;
	width: 15rem;
	height: 20rem;
	border-radius: 2px;
	padding: 0.5rem;
	transition: 0.3s;
	overflow: hidden;
	cursor: pointer;

	@media (max-width: 1000px) {
		width: 10rem;
		height: 15rem;
	}

	:hover {
		transform: scale(1.05);
	}

	.words {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 0.5rem;

		.term,
		.definition {
			margin: 0.2rem 0;
			background-color: #20202090;
			border-radius: 2px;
			padding: 0.5rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			text-transform: capitalize;
			font-size: 0.8rem;
		}
	}
`;
