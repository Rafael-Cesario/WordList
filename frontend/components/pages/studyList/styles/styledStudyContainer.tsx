import styled from "styled-components";

export const StyledStudyContainer = styled.div`
	background-color: #151515;
	margin: 4rem;
	padding: 4rem;
	width: 80%;

	.question h1 {
		margin: 2rem 0;
		font-weight: normal;
	}

	.answer {
		border-radius: 2px;
		margin: 2rem 0;
		padding: 0.5rem 1rem;
		width: 95%;
	}

	.buttons {
		margin: 2rem 0;

		button {
			background-color: #005090;
			margin-right: 2rem;
			padding: 0.5rem 1rem;
			border-radius: 2px;
		}
	}

	.words-left {
		margin: 2rem 0;
		color: #dddddd50;
		font-size: 1rem;
		font-weight: normal;
	}
`;
