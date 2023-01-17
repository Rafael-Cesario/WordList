import { useRouter } from 'next/router';
import { useState } from 'react';
import { getCookies } from '../../services/cookies';
import { queriesList } from '../../services/queries/queriesList';
import { StyledDeleteList } from './styledDeleteList';

interface DeleteListProps {
	props: {
		listName: string;
	};
}

export const DeleteList = ({ props }: DeleteListProps) => {
	const { listName } = props;
	const [showConfirmButton, setShowConfirmButton] = useState(false);

	const router = useRouter();

	const deleteList = async () => {
		const owner = (await getCookies('user')).data.cookie;
		await queriesList.deleteList({ owner, listName });
		router.push('/main');
	};

	return (
		<StyledDeleteList>
			<button onClick={() => setShowConfirmButton(!showConfirmButton)}>Deletar lista</button>

			{showConfirmButton && (
				<div className='confirm'>
					<span>Deletar lista {listName} ?</span>
					<div className='choices'>
						<button onClick={() => deleteList()}>Sim</button>
						<button onClick={() => setShowConfirmButton(false)}>Não</button>
					</div>
				</div>
			)}
		</StyledDeleteList>
	);
};
