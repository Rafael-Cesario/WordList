import Link from "next/link";
import { StyledHeader } from "./styles/headerStyle";
import { AddWords } from "./addWords";
import { ListCookies } from "@/services/interfaces/cookies";

interface Props {
	list: ListCookies;
}

export const Header = ({ list }: Props) => {
	console.log({ list });

	return (
		<StyledHeader>
			<Link className="link" href={"/"}>
				Voltar
			</Link>

			<div className="title">
				<h1>{list.listName}</h1>
				<p>187 Palavras na lista</p>
			</div>

			<AddWords />
		</StyledHeader>
	);
};
