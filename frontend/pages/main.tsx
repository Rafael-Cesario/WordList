import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { deleteCookies } from '../services/cookies';
import { StyledMain } from '../styles/styledMain';

const Main = () => {
	const [showPerfil, setShowPerfil] = useState(false);
	const router = useRouter();

	const logout = async () => {
		await deleteCookies('token');
		router.push('/');
	};

	return (
		<>
			<Head>
				<title>Main</title>
			</Head>

			<StyledMain>
				<header className='menus'>
					<button>Nova lista</button>

					<div className='buttons'>
						<div className='perfil'>
							<button onClick={() => setShowPerfil(!showPerfil)}>Perfil</button>

							{showPerfil && (
								<div className='perfil-buttons'>
									<button onClick={() => logout()}>Sair</button>
								</div>
							)}
						</div>

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
