import styled from 'styled-components';

export const StyledIndex = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	.para {
		color: #bbb;
	}

	.menu {
		position: absolute;
		top: 0;
		right: 0;
		margin: 2rem;

		button {
			color: white;
			padding: 0.5rem 1rem;

			:hover {
				color: #aaa;
			}
		}
	}
`;
