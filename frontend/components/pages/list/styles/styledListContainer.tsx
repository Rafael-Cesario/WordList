import styled from "styled-components";

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
			display: flex;
			flex-direction: column;
			cursor: pointer;
			margin: 1rem;
			background-color: #005090;
			width: 15rem;
			height: 21rem;
			border-radius: 2px;
			padding: 1rem;
			transition: 0.3s;
			overflow: hidden;

			:hover {
				transform: scale(1.05);
			}

			.words {
				display: flex;
				margin: 0.5rem 0;

				.term,
				.definition {
					width: 50%;
					background-color: #10101050;
					border-radius: 2px;
					padding: 0.5rem;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-transform: capitalize;
				}

				.term {
					margin-right: 1rem;
				}
			}
		}
	}
`;
