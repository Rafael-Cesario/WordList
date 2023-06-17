"use client";

import { useState } from "react";
import { StyledCreateList } from "./styles/createListStyle";

export const CreateList = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsOpen(!isOpen)}>Criar nova Lista</button>

			{isOpen && (
				<StyledCreateList>
					<input className="name" type="text" placeholder="Nome" />
					<button className="create">Criar</button>
				</StyledCreateList>
			)}
		</>
	);
};
