"use client";
import Link from "next/link";
import { StoreType } from "@/context/store";
import { useSelector } from "react-redux";

export const Navigate = () => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);
	const linkFromName = wordList.name.replaceAll(" ", "-");
	return <Link href={linkFromName}>Voltar</Link>;
};
