import styled from "styled-components";

export const StyledConfigs = styled.div`
	width: 50vw;
	height: 50vh;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;

	padding: 5rem;
	border-radius: 2px;
	background-color: #151515;
	box-shadow: 5px 5px 5px #10101020;

	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}

	.close,
	.options button {
		height: auto;

		:hover {
			color: #00aaff;
		}
	}

	.close {
		position: absolute;
		padding: 2rem 2rem;
		right: 0;
		top: 0;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 80%;
		max-width: 20rem;
		margin-top: 2rem;
	}

	@media (max-width: 450px) {
		.options {
			flex-direction: column;

			button {
				margin: 1rem 0;
			}
		}

		.listName {
			input {
				width: 50vw;
			}
		}
	}
`;
