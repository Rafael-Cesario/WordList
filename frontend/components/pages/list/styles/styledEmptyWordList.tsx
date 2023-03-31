import styled from 'styled-components';

export const StyledEmptyWordList = styled.div`
	justify-content: center;
	display: flex;
	flex-direction: column;
	margin: 1rem;
	background-color: #005090;
	width: 15rem;
	height: 21rem;
	border-radius: 2px;
	padding: 1rem;
	transition: 0.3s;
	overflow: hidden;
	cursor: pointer;

	@media (max-width: 1000px) {
		width: 10rem;
		height: 15rem;
	}

	p {
		background-color: #202020;
		padding: 0.5rem 1rem;
		border-radius: 2px;
		text-align: center;
	}
`;
