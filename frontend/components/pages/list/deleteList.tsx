import { useRouter } from "next/router";
import { useState } from "react";
import { getCookies } from "../../../services/cookies";
import { queriesList } from "../../../services/queries/queriesList";
import { StyledDeleteList } from "./styles/styledDeleteList";

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
		const owner = await getCookies("user");
		await queriesList.deleteList({ owner, listName });
		router.push("/main");
	};

	return (
		<StyledDeleteList>
			<button onClick={() => setShowConfirmButton(!showConfirmButton)}>Deletar lista</button>

			{showConfirmButton && (
				<div className='confirm'>
					<h1>Deletar lista {listName} ?</h1>
					<div className='choices'>
						<button onClick={() => deleteList()}>Sim</button>
						<button onClick={() => setShowConfirmButton(false)}>Não</button>
					</div>
				</div>
			)}
		</StyledDeleteList>
	);
};
