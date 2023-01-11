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

		.perfil {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.perfil-buttons {
				background-color: #181818;
				border-radius: 5px;
				padding: 1rem;
				position: absolute;
				transform: translate(0, 2rem);
			}
		}

		button,
		a {
			padding: 5px 10px;
			font-weight: bold;
			text-decoration: none;
			color: #ddd;
			font-size: 0.8rem;

			:hover {
				color: #aaa;
			}
		}
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 80vh;

		.lists {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			button {
				width: 10rem;
				height: 2rem;
				margin: 1rem;
				border-radius: 5px;
				background-color: #162436;
			}
		}
	}
`;
