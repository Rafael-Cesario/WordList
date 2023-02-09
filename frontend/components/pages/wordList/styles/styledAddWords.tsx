import styled from "styled-components";

export const StyledAddWords = styled.div`
	margin: 2rem;
	padding: 2rem;
	border-radius: 2px;
	background-color: #151515;
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: 1.2rem;
	}

	.btn-add-words {
		padding: 0.5rem;
		width: 100%;
		background-color: #005090;
	}

	.error {
		color: crimson;
	}
`;
