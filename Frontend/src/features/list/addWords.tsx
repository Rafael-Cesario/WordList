"use client";

import { useState } from "react";
import { StyledAddWords } from "./styles/addWordsStyle";

export const AddWords = () => {
	const [menuAddWords, setMenuAddWords] = useState(false);

	return (
		<>
			<button onClick={() => setMenuAddWords(true)} className="add-words-button">
				Adicionar palavras
			</button>

			{menuAddWords && (
				<StyledAddWords>
					<div className="container">
						<button className="close">x</button>
						<h1 className="title">Adicione novas palavras</h1>

						<input autoFocus={true} type="text" placeholder="Termo" className="term" />
						<input type="text" placeholder="Definições" className="definitions" />

						<button className="submit">Adicionar</button>

						<div className="menu">
							<button>Individual</button>
							<button>Adicionar várias</button>
						</div>
					</div>
				</StyledAddWords>
			)}
		</>
	);
};
