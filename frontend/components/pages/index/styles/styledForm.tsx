import styled from "styled-components";

export const StyledForm = styled.div`
	position: absolute;
	background-color: #151515;
	width: 80vw;
	height: 80vh;
	display: flex;

	align-items: center;
	justify-content: space-between;

	display: flex;
	flex-direction: column;

	.confirm {
		margin: 2rem 0;
		background-color: #00000050;
		width: 20rem;
		padding: 10px 20px;
		font-weight: bold;
	}

	.notification {
		position: absolute;
		bottom: -10vh;
		right: -10vw;
		background-color: forestgreen;
		border-radius: 5px;
		padding: 10px 20px;
		font-weight: normal;
		font-size: 1rem;
		margin: 2rem;
		animation: notification 0.3s ease;

		@keyframes notification {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	}

	.error {
		label {
			color: crimson;
		}

		input {
			border: 1px solid crimson;
		}
	}
`;
