import { useRouter } from 'next/router';
import { useRouterQuery } from '../../../utils/hooks/useRouterQuery';
import { StyledListContainer } from './styles/styledListContainer';

interface ListContainerProps {
	props: {
		status: string;
		lists: string[][];
	};
}

export const ListContainer = ({ props: { status, lists } }: ListContainerProps) => {
	const router = useRouter();
	const [listName] = useRouterQuery('');

	const goToList = (listIndex: number) => {
		const name = listName.replace(/-/g, '_').replace(/ /g, '-');
		router.push(`/${name}/${listIndex}`);
	};

	if (!lists.length) {
		return (
			<StyledListContainer>
				<h1>{status}</h1>
				<p>Você ainda não tem nenhuma lista com este status</p>
			</StyledListContainer>
		);
	}

	return (
		<StyledListContainer>
			<h1>{status}</h1>

			<div className='lists'>
				{lists.map((list, index) => {
					const [term, definition] = list;

					return (
						<div className='list' key={'next' + index} onClick={() => goToList(index)}>
							<div className='words'>
								<p className='term'>{term}</p>
								<p className='definition'>{definition}</p>
							</div>
						</div>
					);
				})}
			</div>
		</StyledListContainer>
	);
};
