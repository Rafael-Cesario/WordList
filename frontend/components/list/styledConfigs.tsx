import styled from 'styled-components';

export const StyledConfigs = styled.div`
	position: absolute;
	margin: 2rem;
	background-color: #151515;
	padding: 1rem;
	border-radius: 2px;

	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 1.1rem;
	}

	.close,
	.options button {
		:hover {
			color: #00aaff;
		}
	}

	.close {
		position: absolute;
		right: 0;
		padding: 0 2rem;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 80%;
	}

	.confirm {
		position: absolute;
		top: -5vh;
		width: 50vw;
		height: 50vh;
		margin: 2rem 0;
		padding: 1rem;
		background-color: #151515;
		border-radius: 2px;

		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-weight: bold;

		.choices {
			display: flex;
			justify-content: space-between;

			button {
				font-weight: bold;
				margin-top: 1rem;
				border-radius: 2px;
				padding: 0.5rem 2rem;
				background-color: #202020;

				:nth-child(1) {
					background-color: crimson;
					color: white;
					margin-right: 1rem;
				}
			}
		}
	}
`;
