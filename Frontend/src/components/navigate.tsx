"use client";
import Link from "next/link";
import { StoreType } from "@/context/store";
import { useSelector } from "react-redux";

export const NavigateToList = ({ params }: { params?: string }) => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);
	let linkFromName = wordList.name?.replaceAll(" ", "-");
	if (params) linkFromName += params;
	return <Link href={linkFromName}>Voltar</Link>;
};
