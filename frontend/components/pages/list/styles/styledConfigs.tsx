import styled from "styled-components";

export const StyledConfigs = styled.div`
	position: absolute;
	padding: 1rem;
	border-radius: 2px;
	top: 50%;
	left: 50%;
	z-index: 1;
	transform: translate(-50%, -50%);
	background-color: #151515;
	box-shadow: 5px 5px 5px #10101020;

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
