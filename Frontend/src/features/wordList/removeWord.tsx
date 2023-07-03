import { useState } from "react";

export const RemoveWord = () => {
	const [confirmRemoveWord, setConfirmRemoveWord] = useState(false);

	return (
		<>
			{confirmRemoveWord && (
				<button autoFocus={true} onBlur={() => setConfirmRemoveWord(false)} className="remove confirm">
					Clique novamente para remover esta palavra
				</button>
			)}

			{confirmRemoveWord || (
				<button onClick={() => setConfirmRemoveWord(true)} title="Remover palavra" className="remove">
					x
				</button>
			)}
		</>
	);
};
