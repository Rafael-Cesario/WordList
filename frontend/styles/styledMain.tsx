import styled from 'styled-components';

export const StyledMain = styled.div`
	margin: 2rem;

	.menus {
		display: flex;
		justify-content: space-between;

		.buttons {
			display: flex;
			flex-wrap: wrap;
		}

		button,
		a {
			padding: 5px 10px;
			font-weight: bold;
			text-decoration: none;
			color: #ddd;
			font-size: 0.8rem;

			:hover {
				color: #00aaff;
			}
		}
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 80vh;

		.lists {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 0 20vw;

			button {
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
		}
	}
`;
