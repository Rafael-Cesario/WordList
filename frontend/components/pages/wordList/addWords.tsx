import { FormEvent, useState } from "react";
import { TextInput } from "../../inputs/inputs";
import { StyledAddWords } from "./styles/styledAddWords";
import { sendError } from "./utils/sendError";
import { findWord } from "./utils/findWord";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { QueriesWords } from "../../../services/queries/queriesWords";
import { useLocalData } from "../../../utils/hooks/useLocalData";

export const AddWords = () => {
	const [values, setValues] = useState<{ [key: string]: string }>({ term: "", definition: "" });
	const { words, mutate } = useQueriesWordsSWR();

	const { storage } = useLocalData();
	const { listIndex, listName, listStatus, owner } = storage;

	const addNewWord = async (e: FormEvent) => {
		e.preventDefault();

		const hasWord = findWord(words, values.term);
		if (hasWord) return sendError("term", "Esta palavra já foi adicionada");

		const { term, definition } = values;
		const variableWords = { listName, owner, definition, term, listIndex, status: listStatus };

		// todo > handle if error
		const queriesWords = new QueriesWords();
		await queriesWords.addWords({ words: variableWords });
		mutate();

		setValues({ term: "", definition: "" });

		const termInput = document.querySelector("#term") as HTMLInputElement;
		termInput.focus();
	};

	return (
		<StyledAddWords>
			<h1 className='title'>Adicionar Palavras</h1>

			<form onSubmit={e => addNewWord(e)}>
				<TextInput props={{ content: "Termo", name: "term", values, setValues }} />
				<TextInput props={{ content: "Definição", name: "definition", values, setValues }} />
				<button className='btn-add-words'>Adicionar</button>
			</form>
		</StyledAddWords>
	);
};
