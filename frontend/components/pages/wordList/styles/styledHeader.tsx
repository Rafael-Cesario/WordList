import styled from "styled-components";

export const StyledHeader = styled.header`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	justify-items: center;

	.link {
		justify-self: start;
		color: #ddd;
		text-decoration: none;

		:hover {
			color: #00aaff;
		}
	}

	.info {
		justify-self: end;
		text-align: right;
	}

	.title {
		font-size: 1.2rem;
	}
`;
