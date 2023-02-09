import { FormEvent, useContext, useState } from "react";
import { TextInput } from "../../inputs/inputs";
import { ContextWords } from "./context/contextWords";
import { StyledAddWords } from "./styles/styledAddWords";
import { sendError } from "./utils/sendError";
import { findWord } from "./utils/findWord";

export const AddWords = () => {
	const [values, setValues] = useState<{ [key: string]: string }>({ term: "", definition: "" });
	const { words, addWords } = useContext(ContextWords);

	const addNewWord = async (e: FormEvent) => {
		e.preventDefault();

		const hasWord = findWord(words, values.term);
		if (hasWord) return sendError("term", "Esta palavra já foi adicionada");

		await addWords([values.term, values.definition]);

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
