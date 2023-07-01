"use client";
import Link from "next/link";
import { StyledHeader } from "./styles/headerStyle";
import { AddWords } from "./addWords";
import { ListCookies } from "@/services/interfaces/cookies";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "@/context/store";
import { Configs } from "./configs";

interface Props {
	listCookies: ListCookies;
}

// todo > loading, remove listCookies
export const Header = ({ listCookies }: Props) => {
	const { list } = useSelector((state: StoreType) => state.oneList);
	const { name, words } = list;
	const [loadingList, setLoadingList] = useState(false);

	return (
		<StyledHeader>
			<Link className="link" href={"/"}>
				Voltar
			</Link>

			<div className="title">
				{loadingList ? <div className="loading" /> : <h1>{name}</h1>}
				{loadingList ? (
					<div className="loading" />
				) : (
					<p>
						{words.length} {words.length === 1 ? "Palavra" : "Palavras"} na lista
					</p>
				)}
			</div>

			<div className="menu">
				<Configs />
				<AddWords />
			</div>
		</StyledHeader>
	);
};
