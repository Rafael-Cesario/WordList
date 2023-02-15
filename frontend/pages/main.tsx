/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Head from "next/head";
import Link from "next/link";
import { Lists } from "../components/pages/main/lists";
import { NewList } from "../components/pages/main/newList";
import { Perfil } from "../components/pages/main/perfil";
import { StyledMain } from "../styles/styledMain";

const Main = () => {
	return (
		<>
			<Head>
				<title>WordList</title>
			</Head>

			<StyledMain>
				<header className='menus'>
					<NewList />

					<div className='buttons'>
						<Perfil />

						<Link href={"/about"}>Sobre</Link>
						<Link href={"/usage"}>Dicas de uso</Link>
					</div>
				</header>

				<main>
					<Lists />
				</main>
			</StyledMain>
		</>
	);
};

export default Main;
