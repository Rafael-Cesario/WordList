import Head from 'next/head';
import Link from 'next/link';
import { NewList } from '../components/pages/main/newList';
import { Perfil } from '../components/pages/main/perfil';
import { StyledMain } from '../styles/styledMain';

const Main = () => {
	return (
		<>
			<Head>
				<title>Main</title>
			</Head>

			<StyledMain>
				<header className='menus'>
					<NewList />

					<div className='buttons'>
						<Perfil />

						<Link href={'/about'}>Sobre</Link>
						<Link href={'/usage'}>Dicas de uso</Link>
						<Link href={'http://github.com/rafael-cesario/wordlist'} target={'_blank'}>
							Página no Github
						</Link>
					</div>
				</header>

				<main>
					<div className='lists'></div>
				</main>
			</StyledMain>
		</>
	);
};

export default Main;
