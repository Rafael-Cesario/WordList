"use client";
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: 0;
        font-weight: normal;
    }

    body {
        background-color: ${theme.background};
        color: #eee;
    }

    
    button, input {
        border: none;
        outline: none;
        background-color: ${theme.container};
        color: #ddd;
        border-radius: 2px;
    }

    button {
        cursor: pointer;
        background-color: ${theme.primary};
        color: #ddd;
        padding: 10px 20px;
        transition: 0.2s;

        &:active {
            transform: scale(0.95);
        }
    }
`;
