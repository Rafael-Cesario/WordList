import { StyledListContainer } from './styles/styledListContainer';

interface ListContainerProps {
	props: {
		status: string;
		lists: string[][];
	};
}

export const ListContainer = ({ props: { status, lists } }: ListContainerProps) => {
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
					return <div className='list' key={'next' + index}></div>;
				})}
			</div>
		</StyledListContainer>
	);
};
