import { FormEvent, useState } from "react";
import { TextInput } from "../../inputs/inputs";
import { StyledNewList } from "./styles/styledNewList";
import { queriesList } from "../../../services/queries/queriesList";
import { IStorage } from "../../../interfaces/storage";
import { useLists } from "../../../utils/hooks/useLists";

export const NewList = () => {
	const { mutate } = useLists();
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState<{ [key: string]: string }>({});

	const createNewList = async (e: FormEvent) => {
		e.preventDefault();

		const storage = localStorage.getItem("wordList");

		// todo > notification
		if (!storage) return console.log("Error, create new list");

		const data = JSON.parse(storage) as IStorage;
		const owner = data.owner;
		const listName = values.name;
		await queriesList.createList({ owner, listName });
		mutate();

		setValues({});
	};

	return (
		<StyledNewList>
			<button title={"Button new list"} onClick={() => setShowNewList(!showNewList)}>
				Nova lista
			</button>

			{showNewList && (
				<form onSubmit={e => createNewList(e)}>
					<h1 title={"New list"}>Nova Lista</h1>

					<TextInput
						props={{
							content: "Nome",
							name: "name",
							values,
							setValues,
						}}
					/>

					<button title={"Create new list"}>Criar nova lista</button>
				</form>
			)}
		</StyledNewList>
	);
};
