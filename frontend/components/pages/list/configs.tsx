import { useState } from "react";
import { TextInput } from "../../inputs/inputs";
import { StyledConfigs } from "./styles/styledConfigs";
import { SaveConfigs } from "./saveConfigs";
import { DeleteList } from "./deleteList";

interface ConfigsProps {
	props: {
		setShowConfigs: (showConfigs: boolean) => void;
	};
}

export const Configs = ({ props }: ConfigsProps) => {
	const { setShowConfigs } = props;
	const [values, setValues] = useState<{ [key: string]: string }>({});

	return (
		<StyledConfigs>
			<h1 role='configs-title'>Configs</h1>
			<button role='close-configs' className='close' onClick={() => setShowConfigs(false)}>
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
				<SaveConfigs props={{ values, setShowConfigs }} />
				<DeleteList />
			</div>
		</StyledConfigs>
	);
};
