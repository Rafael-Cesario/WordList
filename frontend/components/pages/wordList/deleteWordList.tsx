import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";

export const DeleteWordList = () => {
	const router = useRouter();
	const { mutate } = useQueriesWordListSWR();

	const { storage } = useLocalData();
	const { owner, listIndex, listName, listStatus } = storage;

	const deleteWordList = async () => {
		const queriesWordList = new QueriesWordList();
		await queriesWordList.deleteWordList({
			listName,
			owner,
			wordListIndex: Number(listIndex),
			wordListStatus: listStatus as TypeListStatus,
		});

		mutate();
		router.push(`/${listName}`);
	};

	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		const button = document.querySelector(".delete") as HTMLButtonElement;
		button?.focus();
	}, [confirm]);

	return confirm ? (
		<button role={"delete-btn-confirm"} className='delete' onClick={() => deleteWordList()} onBlur={() => setConfirm(false)}>
			Clique novamente para excluir, clique em outra area da tela para cancelar
		</button>
	) : (
		<button role={"delete-btn"} onClick={() => setConfirm(true)}>
			Excluir Lista
		</button>
	);
};
