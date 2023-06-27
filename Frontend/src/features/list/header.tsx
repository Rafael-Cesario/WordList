import Link from "next/link";
import { StyledHeader } from "./styles/headerStyle";

export const Header = () => {
	return (
		<StyledHeader>
			<Link className="link" href={"/"}>
				Voltar
			</Link>

			<div className="title">
				<h1>ListName</h1>
				<p>187 Palavras na lista</p>
			</div>

			<button className="add-words-button">Adicionar palavras</button>
		</StyledHeader>
	);
};
