import styled from "styled-components";

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
	}
`;
