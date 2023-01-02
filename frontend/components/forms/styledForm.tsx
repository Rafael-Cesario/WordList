import styled from 'styled-components';

export const StyledForm = styled.form`
	position: absolute;
	background-color: #151515;
	width: 80vw;
	height: 80vh;
	display: flex;

	align-items: center;
	justify-content: space-between;

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

	.confirm {
		margin: 2rem 0;
		background-color: #00000050;
		width: 20rem;
		padding: 10px 20px;
		font-weight: bold;
	}
`;
