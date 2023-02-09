import styled from "styled-components";

export const StyledConfigs = styled.div`
	position: absolute;
	margin: 2rem;
	background-color: #151515;
	padding: 1rem;
	border-radius: 2px;

	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 1.1rem;
	}

	.close,
	.options button {
		:hover {
			color: #00aaff;
		}
	}

	.close {
		position: absolute;
		right: 0;
		padding: 0 2rem;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 80%;
	}
`;
