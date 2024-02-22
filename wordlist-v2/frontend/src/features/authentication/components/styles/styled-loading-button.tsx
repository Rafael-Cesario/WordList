"use client";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const StyledLoadingButton = styled.button`
	span {
		margin: 0px 4px;
	}
  
  :nth-child(1) {
    animation: loading 1s infinite;
  }

  :nth-child(2) {
    animation: loading 1s 0.2s infinite;
  }

  :nth-child(3) {
    animation: loading 1s 0.4s infinite;
  }


  @keyframes loading {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
