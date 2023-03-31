import { PageHead } from '../components/head/head';
import Link from 'next/link';
import { StyledAbout } from '../styles/styledAbout';

const Usage = () => {
	return (
		<div>
			<PageHead title='WordList' />

			<StyledAbout>
				<header>
					<h1>WordList</h1>
					<Link href={'/main'}>Voltar</Link>
				</header>

				<main>
					<p>
						WordList é um site feito para te ajudar a aprender um idioma, mais precisamente para te ajudar a memorizar algumas palavras.
					</p>
					<p>
						Enquanto você estiver lendo um livro, vendo a letra de uma música ou assistindo algo, novas palavras que você ainda não
						conhece irão aparecer, use o site para adicionar estas palavras e revisar elas mais tarde.
					</p>
					<p>
						Use o site como um caderno onde você salvaria suas palavras, talvez separando elas por verbos, objetos, lugares, roupas ou
						qualquer outra categoria que você gostaria de criar.
					</p>
					<span>Boas vindas ao WordList</span>
					<Link href={'http://github.com/rafael-cesario/wordlist'} target='_blank'>
						Visite a página no Github
					</Link>
				</main>
			</StyledAbout>
		</div>
	);
};

export default Usage;
