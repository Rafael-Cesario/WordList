import styled from 'styled-components';

export const StyledListContainer = styled.div`
	margin: 5rem 0;
	width: 100%;
	background-color: #151515;
	border-radius: 2px;
	padding: 1rem;

	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 1.2rem;
		padding: 0.5rem;
		border-radius: 2px;
		transform: translateY(-2rem);
		background-color: #005080;
	}

	p {
		text-transform: none;
	}

	.lists {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.list {
			cursor: pointer;
			margin: 1rem;
			background-color: #005090;
			width: 10rem;
			height: 15rem;
			border-radius: 2px;
			padding: 1rem;
			transition: 0.3s;

			:hover {
				transform: scale(1.1);
			}
		}
	}
`;
