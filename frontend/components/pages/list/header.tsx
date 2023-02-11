import Link from "next/link";
import { useState } from "react";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { Configs } from "./configs";
import { CreateWordList } from "./createWordList";

export const Header = () => {
	const { listName } = useRouterQuery("Carregando...");
	const [showConfigs, setShowConfigs] = useState(false);

	// temp
	const totalWords = 0;

	return (
		<header>
			<Link href={"/main"}> Voltar </Link>

			<div className='title'>
				<h1>{listName}</h1>
				<span>{totalWords} palavras</span>
			</div>

			<div className='menus'>
				<CreateWordList />
				<button onClick={() => setShowConfigs(!showConfigs)}>Configs</button>
			</div>

			{showConfigs && <Configs props={{ setShowConfigs, listName }} />}
		</header>
	);
};
