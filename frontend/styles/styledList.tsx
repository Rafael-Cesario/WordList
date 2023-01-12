import styled from 'styled-components';

export const StyledList = styled.div`
	margin: 2rem;
	text-transform: capitalize;

	main {
		position: relative;
		display: flex;
		justify-content: center;
	}

	header {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: start;

		.menus button,
		a {
			:hover {
				color: #00ccff;
			}
		}

		a {
			text-decoration: none;
			color: #ddd;
			width: fit-content;
			padding: 0.5rem 1rem;
		}

		.title {
			display: flex;
			flex-direction: column;
			text-align: center;

			h1 {
				font-size: 1.1rem;
			}

			span {
				color: #dddddd80;
			}
		}

		.menus {
			justify-self: end;
			button {
				margin: 5px;
				padding: 0.5rem 1rem;
			}
		}
	}
`;
