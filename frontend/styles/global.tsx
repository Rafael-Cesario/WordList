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

	button, input, label {
		outline:none;
		border:none;
	}

	button {
		cursor: pointer;
		background-color: transparent;
		color: #ddd;
	}

	label {
		cursor: pointer;
	}

	input {
		background-color: #00000050;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 1rem;
		color: #ddd;
	}
`;
