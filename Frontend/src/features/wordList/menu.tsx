"use client";
import { useDispatch } from "react-redux";
import { StyledMenu } from "./styles/menuStyle";
import { setSearch } from "./context/searchSlice";

export const Menu = () => {
	const dispatch = useDispatch();

	return (
		<StyledMenu>
			<div className="buttons">
				<button>Estudar palavras</button>
				<button>Responder com: Tradução</button>
			</div>

			<input
				onChange={(e) => dispatch(setSearch({ newSearchValue: e.target.value }))}
				className="search"
				type="text"
				placeholder="Procure por uma palavra ou sua tradução..."
			/>

			<div className="line" />
		</StyledMenu>
	);
};
