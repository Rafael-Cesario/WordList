"use client";

import { useState } from "react";
import { StyledAddWords } from "./styles/addWordsStyle";

export const AddWords = () => {
	const [menuAddWords, setMenuAddWords] = useState<"" | "one" | "many">("");

	const generateClass = (name: "one" | "many") => {
		return menuAddWords === name ? "active" : "";
	};

	return (
		<>
			<button onClick={() => setMenuAddWords("one")} className="add-words-button">
				Adicionar palavras
			</button>

			{menuAddWords && (
				<StyledAddWords>
					<div className="container">
						<div className="menu">
							<button onClick={() => setMenuAddWords("one")} className={generateClass("one")}>
								Individual
							</button>
							<button onClick={() => setMenuAddWords("many")} className={generateClass("many")}>
								Adicionar várias
							</button>
						</div>

						<button className="close" onClick={() => setMenuAddWords("")}>
							x
						</button>

						<h1 className="title">Adicione novas palavras</h1>

						{menuAddWords === "one" && (
							<>
								<input autoFocus={true} type="text" placeholder="Termo" className="term" />
								<input type="text" placeholder="Definições" className="definitions" />
							</>
						)}

						{menuAddWords === "many" && <textarea></textarea>}

						<button className="submit">Adicionar</button>
					</div>
				</StyledAddWords>
			)}
		</>
	);
};
