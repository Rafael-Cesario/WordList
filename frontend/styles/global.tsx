import { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: 0;
		font-family: 'Inconsolata', 'Courier New', Courier, monospace;
	}

	body {
		background-color: #101010;
		color: #ddd;
	}

	button {
		outline: none;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
`;
