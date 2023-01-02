import { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: 0;
	}

	body {
		background-color: #101010;
		color: #ddd;
	}
`;
