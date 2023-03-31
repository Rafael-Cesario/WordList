import styled from 'styled-components';

export const StyledAbout = styled.main`
	margin: 2rem;
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	a {
		color: #00aaff90;
		text-decoration: none;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	main {
		display: flex;
		flex-direction: column;

		margin: 2rem 0;
		max-width: 500px;

		p {
			margin: 1rem 0;
		}
	}
`;
