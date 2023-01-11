import Head from 'next/head';
import { StyledMain } from '../styles/styledMain';

const Main = () => {
	return (
		<>
			<Head>
				<title>Main</title>
			</Head>

			<StyledMain>
				<header className='menus'>
					<button>Nova lista</button>

					<div className='buttons'>
						<button>Perfil</button>
						<button>Sobre</button>
						<button>Dicas de uso</button>
						<button>Página no Github</button>
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
