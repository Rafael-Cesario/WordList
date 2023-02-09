import styled from "styled-components";

export const StyledInput = styled.div`
	margin: 2rem;
	position: relative;

	input {
		width: 20rem;
	}

	label {
		display: block;
		margin-bottom: 10px;
		margin-left: 1rem ;
		font-size: 0.9rem;
	}

	.icon {
		filter: invert(50%);
		position: absolute;
		top: 0;
		right: 0;
		margin: 0 1rem;
	}
`;
