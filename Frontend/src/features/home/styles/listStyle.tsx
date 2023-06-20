"use client";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledList = styled.div`
	width: 300px;
	height: 80px;
	margin: 1rem;
	border-radius: 2px;
	border-left: 10px solid ${theme.primary};
	background-color: ${theme.container};
	box-shadow: 0 10px 2px #11111150;
	display: flex;
	align-items: center;
	padding-left: 2rem;
	text-transform: capitalize;
	cursor: pointer;
	transition: 0.3s;
	position: relative;
	user-select: none;

	&:hover {
		transform: scale(1.05);
	}

	.menu {
		position: absolute;
		top: -2.5rem;
		right: -5px;
		display: flex;
		animation: show 0.2s ease-out;

		.option {
			margin: 5px;
			background-color: ${theme.primary};
			padding: 5px 20px;
			font-weight: bold;

			&:nth-child(3) {
				background-color: ${theme.error};
			}

			&:hover {
				background-color: ${theme.container};
			}
		}
	}

	@keyframes show {
		from {
			opacity: 0;
			transform: translateY(20px);
		}

		to {
			opacity: 1;
		}
	}
`;
