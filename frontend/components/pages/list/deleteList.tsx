import { useRouter } from "next/router";
import { useState } from "react";
import { queriesList } from "../../../services/queries/queriesList";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { StyledDeleteList } from "./styles/styledDeleteList";

export const DeleteList = () => {
	const router = useRouter();

	const [showConfirmButton, setShowConfirmButton] = useState(false);

	const { storage } = useLocalData();
	const { owner, listName } = storage;

	const { mutate } = useQueriesWordListSWR();

	const deleteList = async () => {
		// todo > handle if error
		await queriesList.deleteList({ owner, listName });
		mutate();
		router.push("/main");
	};

	return (
		<StyledDeleteList>
			<button role='delete-list' onClick={() => setShowConfirmButton(!showConfirmButton)}>
				Deletar lista
			</button>

			{showConfirmButton && (
				<div className='confirm'>
					<h1>Deletar lista {listName} ?</h1>
					<div className='choices'>
						<button role='confirm-delete-list' onClick={() => deleteList()}>
							Sim
						</button>
						<button onClick={() => setShowConfirmButton(false)}>Não</button>
					</div>
				</div>
			)}
		</StyledDeleteList>
	);
};
