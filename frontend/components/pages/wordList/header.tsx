import Link from 'next/link';
import { useRouterQuery } from '../../../utils/hooks/useRouterQuery';
import { StyledHeader } from './styles/styledHeader';

export const Header = () => {
	const { link, listName } = useRouterQuery('Carregando...');

	// temp
	const totalWords = 100;
	const listStatus = 'Diariamente';

	return (
		<StyledHeader>
			<Link className='link' href={`/${link}`}>
				Voltar
			</Link>
			<h1 className='title'>{listName}</h1>

			<div className='info'>
				<p>Palavras: {totalWords}</p>
				<p>Estudar lista: {listStatus}</p>
			</div>
		</StyledHeader>
	);
};
