import Link from 'next/link';
import { useRouterQuery } from '../../../utils/hooks/useRouterQuery';
import { StyledHeader } from './styles/styledHeader';

interface HeaderProps {
	props: {
		words: string[][];
	};
}

export const Header = ({ props: { words } }: HeaderProps) => {
	const { link, listName } = useRouterQuery('Carregando...');
	const totalWords = words.length;

	// todo > list status
	const listStatus = 'Próximas';

	return (
		<StyledHeader>
			<Link className='link' href={`/${link}`}>
				Voltar
			</Link>
			<h1 className='title'>{listName}</h1>

			<div className='info'>
				<p>Palavras na lista: {totalWords}</p>
				<p>Estudar lista: {listStatus}</p>
			</div>
		</StyledHeader>
	);
};
