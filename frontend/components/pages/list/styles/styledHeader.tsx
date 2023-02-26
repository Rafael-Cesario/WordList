import styled from "styled-components";

export const StyledHeader = styled.div`
	margin: 2rem;
	display: grid;
	align-items: start;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 600px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	a,
	.title,
	.menus {
		margin: 1rem 0;
	}

	.menus button,
	a {
		:hover {
			color: #00ccff;
		}
	}

	a {
		text-decoration: none;
		color: #ddd;
		width: fit-content;
		padding: 0.5rem 1rem;
	}

	.title {
		justify-self: center;
		display: flex;
		flex-direction: column;
		text-align: center;

		h1 {
			font-size: 1.1rem;
		}

		span {
			color: #dddddd80;
		}
	}

	.menus {
		justify-self: end;
		background-color: #005090;
		border-radius: 0.2rem;
		box-shadow: 2px 2px 2px #00000020;

		button {
			margin: 5px;
			padding: 0.5rem 1rem;
		}
	}
`;
