import Head from 'next/head';
import Link from 'next/link';
import { NewList } from '../components/pages/main/newList';
import { Perfil } from '../components/pages/main/perfil';
import { StyledMain } from '../styles/styledMain';
import { useLists } from '../utils/hooks/useLists';

const Main = () => {
	const [lists, setLists] = useLists([]);

	return (
		<>
			<Head>
				<title>WordList</title>
			</Head>

			<StyledMain>
				<header className='menus'>
					<NewList props={{ lists, setLists }} />

					<div className='buttons'>
						<Perfil />

						<Link href={'/about'}>Sobre</Link>
						<Link href={'/usage'}>Dicas de uso</Link>
					</div>
				</header>

				<main>
					<div className='lists'>
						{lists.map(list => {
							return <button key={list}>{list}</button>;
						})}
					</div>
				</main>
			</StyledMain>
		</>
	);
};

export default Main;
