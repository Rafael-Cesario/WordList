import { useState } from "react";
import { TextInput } from "../../inputs/inputs";
import { StyledConfigs } from "./styles/styledConfigs";
import { SaveConfigs } from "./saveConfigs";
import { DeleteList } from "./deleteList";

interface ConfigsProps {
	props: {
		setShowConfigs: (showConfigs: boolean) => void;
		listName: string;
	};
}

export const Configs = ({ props }: ConfigsProps) => {
	const { setShowConfigs, listName } = props;
	const [values, setValues] = useState<{ [key: string]: string }>({});

	return (
		<StyledConfigs>
			<h1>Configs</h1>
			<button className='close' onClick={() => setShowConfigs(false)}>
				x
			</button>

			<TextInput
				props={{
					content: "Nome da lista",
					name: "listName",
					values,
					setValues,
				}}
			/>

			<div className='options'>
				<SaveConfigs props={{ values, listName, setShowConfigs }} />
				<DeleteList props={{ listName }} />
			</div>
		</StyledConfigs>
	);
};
