import { useState } from "react";
import { StyledConfigs } from "./styles/configsStyle";
import { useSelector } from "react-redux";
import { StoreType } from "@/context/store";

export const Configs = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { list } = useSelector((state: StoreType) => state.oneList);
	const { wordsPerWordList, timesUntilLearning } = list;

	return (
		<>
			<button className="configs-button" onClick={() => setIsOpen(true)}>
				Configs
			</button>

			{isOpen && (
				<StyledConfigs>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1 className="title">Configurações</h1>

						<div className="main">
							<div className="config-container">
								<div className="config">
									<label htmlFor="words-per-wordlist">Palavras por lista de palavras :</label>
									<input type="text" id="words-per-wordlist" placeholder={String(wordsPerWordList)} />
								</div>
								<div className="config">
									<label htmlFor="times-until-learning">Quantidade de acertos até uma palavra ser marcada como aprendida: </label>
									<input type="text" id="times-until-learning" placeholder={String(timesUntilLearning)} />
								</div>
							</div>
							<div className="stats">
								<p>Palavras na lista: 150</p>
								<p>Palavras aprendidas: 100</p>
								<p>Palavras não aprendidas: 50</p>
							</div>
						</div>

						<div className="buttons">
							<button>Salvar</button>
							<button>Resetar palavras aprendidas</button>
						</div>
					</div>
				</StyledConfigs>
			)}
		</>
	);
};
