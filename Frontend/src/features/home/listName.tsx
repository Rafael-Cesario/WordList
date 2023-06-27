import { IList } from "@/services/interfaces/list";

interface ListNameProps {
	props: {
		editable: boolean;
		showMenu: boolean;
		list: IList;
		listName: string;
		setShowMenu: (newState: boolean) => void;
		setListName: (newState: string) => void;
	};
}

export const ListName = ({ props: { editable, setShowMenu, showMenu, list, listName, setListName } }: ListNameProps) => {
	return (
		<>
			{editable || (
				<p className="listName" onClick={() => setShowMenu(!showMenu)}>
					{list.name}
				</p>
			)}

			{editable && (
				<input
					role="input-list-name"
					autoFocus={true}
					className="editable"
					type="text"
					placeholder="Nome"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
				/>
			)}
		</>
	);
};
