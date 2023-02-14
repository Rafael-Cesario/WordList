import styled from "styled-components";

export const StyledWordsContainer = styled.div`
	background-color: #151515;
	margin: 2rem;
	padding: 2rem;
	width: 80%;
	max-width: 1000px;
	display: flex;
	flex-direction: column-reverse;
	position: relative;

	.word {
		display: flex;
		justify-content: space-between;

		.term,
		.definition {
			width: 44%;
			margin: 0.3rem 0;

			::placeholder {
				color: #ddd;
			}
		}
	}
`;
