"use client";
import { StyledMenu } from "./styles/menuStyle";

export const Menu = () => {
	return (
		<StyledMenu>
			<div className="buttons">
				<button>Estudar palavras</button>
				<button>Responder com: Tradução</button>
			</div>

			<input className="search" type="text" placeholder="Procure por uma palavra ou sua tradução..." />

			<div className="line" />
		</StyledMenu>
	);
};
