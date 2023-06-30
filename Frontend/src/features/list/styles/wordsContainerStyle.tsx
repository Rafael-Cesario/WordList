import { theme } from "@/styles/theme";
import { styled } from "styled-components";

export const StyledWordsContainer = styled.div`
	margin: 0 4rem;
	margin-top: 10rem;

	.group-title {
		padding: 10px 3rem;
		background-color: ${theme.primary};
		border-radius: 2px;
		width: fit-content;
		margin-bottom: 1rem;
		font-size: 1.1rem;
		box-shadow: 2px 2px 2px #11111120;
	}

	.container {
		background-color: ${theme.container};
		padding: 2rem;
		border-radius: 2px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 310px);
		justify-content: center;
	}

	.group {
		display: flex;
		flex-direction: column;
		background-color: ${theme.primary};
		margin: 0.5rem;
		padding: 10px;
		max-height: 350px;
		overflow: hidden;
		border-radius: 2px;
		box-shadow: 10px 10px 5px #11111110;
		cursor: pointer;
		transition: 0.1s;

		&:hover {
			transform: scale(1.02);
		}
	}

	.word {
		margin: 0.2rem;
		display: grid;
		grid-template-columns: 1fr 1fr;

		.term {
			margin-right: 5px;
		}

		.term,
		.definitions {
			background-color: ${theme.container + "50"};
			text-transform: capitalize;
			font-size: 0.8rem;
			font-weight: 400;
			padding: 2px 10px;
			border-radius: 2px;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 110px;
			height: 1.2em;
			white-space: nowrap;
		}
	}
`;
