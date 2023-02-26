import styled from "styled-components";

export const StyledNewList = styled.div`
	form {
		position: absolute;
		background-color: #151515;
		border-radius: 2px;
		padding: 1rem;
		margin: 1rem 0;
		z-index: 2;
		width: 70vw;
		max-width: 500px;

		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			font-size: 1rem;
			margin-top: 1rem;
		}

		.name {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 2rem 0;
			width: 100%;

			@media (max-width: 600px) {
				input {
					width: 80%;
				}
			}
		}

		button {
			background-color: #105090;
			border-radius: 2px;
			width: 100%;
			height: 2rem;
		}
	}

	.error {
		color: crimson;
	}
`;
