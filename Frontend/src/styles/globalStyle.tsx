"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: 0;
    }

    body {
        background-color: #202020;
        color: #eee;
    }

    button, input {
        border: none;
        outline: none;
        background-color: #252525;
        color: #ddd;
    }
`;
