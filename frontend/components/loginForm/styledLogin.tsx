import styled from 'styled-components';

export const StyledLogin = styled.div`
	position: absolute;
	background-color: #151515;
	width: 80vw;
	height: 80vh;
	display: flex;

	justify-content: space-between;
	align-items: center;

	display: flex;
	flex-direction: column;

	h1 {
		margin: 2rem 0;
	}

	.close {
		color: white;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 1rem;
		padding: 2rem;
	}

	.email,
	.password {
		margin: 2rem;
		position: relative;

		input {
			width: 20rem;
		}

		label {
			display: block;
			margin-bottom: 10px;
			font-size: 0.9rem;
		}

		.icon {
			filter: invert(50%);
			position: absolute;
			top: 0;
			right: 0;
			margin: 0 1rem;
		}
	}

	.confirm {
		margin: 2rem 0;
		background-color: #00000050;
		width: 20rem;
		padding: 10px 20px;
		font-weight: bold;
	}
`;
