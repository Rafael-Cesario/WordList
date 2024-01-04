"use client"
import * as styled from "styled-components";
import { theme } from "./theme";

export const StyledGlobal = styled.createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: ${theme.background};
		color: ${theme.text};
	}
`;
