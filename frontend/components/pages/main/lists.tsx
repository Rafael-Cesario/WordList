import { useRouter } from 'next/router';
import { StyledLists } from './styles/styledLists';

interface ListsProps {
	props: {
		lists: string[];
	};
}

export const Lists = ({ props }: ListsProps) => {
	const { lists } = props;
	const router = useRouter();

	return (
		<StyledLists>
			{lists.map(list => {
				const link = '/' + list.replace(/-/g, '_').replace(/ /g, '-');

				return (
					<button onClick={() => router.push(link)} key={list} title={'List'}>
						{list}
					</button>
				);
			})}
		</StyledLists>
	);
};
