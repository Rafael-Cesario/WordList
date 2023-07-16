import { useContext, useState } from "react";
import { StyledConfigs } from "./styles/configsStyle";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/context/store";
import { NotificationContext } from "@/context/notification";
import { useQueriesList } from "@/hooks/useQueriesList";
import { oneListSlice } from "./context/oneListSlice";

export const Configs = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { list } = useSelector((state: StoreType) => state.oneList);
	const { wordsPerWordList, timesUntilLearning, userID, _id } = list;
	const [configValues, setConfigValues] = useState({ wordsPerWordList, timesUntilLearning });

	const { setNotificationValues } = useContext(NotificationContext);
	const { requestUpdateConfigs } = useQueriesList();
	const dispatch = useDispatch();

	const saveConfigs = async () => {
		const { wordsPerWordList, timesUntilLearning } = configValues;

		if (!wordsPerWordList || !timesUntilLearning) {
			return setNotificationValues({
				isOpen: true,
				type: "error",
				title: "Erro ao salvar novas configurações",
				message: "Você não pode deixar campos vazios.",
			});
		}

		const updateConfigs = { listID: _id, userID, wordsPerWordList, timesUntilLearning };
		const { data, error } = await requestUpdateConfigs({ updateConfigs });

		if (error) {
			return setNotificationValues({
				isOpen: true,
				type: "error",
				title: "Erro ao salvar novas configurações",
				message: error,
			});
		}

		setIsOpen(false);
		dispatch(oneListSlice.actions.updateConfigs({ timesUntilLearning, wordsPerWordList }));
		setNotificationValues({ isOpen: true, type: "success", title: "Configurações", message: data });
	};

	return (
		<>
			<button role="open-close-configs" className="configs-button" onClick={() => setIsOpen(true)}>
				Configs
			</button>

			{isOpen && (
				<StyledConfigs>
					<div className="container" role="configs-container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1 className="title">Configurações</h1>

						<div className="main">
							<div className="config-container">
								<div className="config">
									<label htmlFor="words-per-wordlist">Palavras por lista de palavras :</label>
									<input
										onChange={(e) => setConfigValues({ ...configValues, wordsPerWordList: Number(e.target.value) })}
										type="text"
										id="words-per-wordlist"
										placeholder={String(wordsPerWordList)}
									/>
								</div>
								<div className="config">
									<label htmlFor="times-until-learning">Quantidade de acertos até uma palavra ser marcada como aprendida: </label>
									<input
										onChange={(e) => setConfigValues({ ...configValues, timesUntilLearning: Number(e.target.value) })}
										type="text"
										id="times-until-learning"
										placeholder={String(timesUntilLearning)}
									/>
								</div>
							</div>
							{/* Todo > remove placeholder values */}
							<div className="stats">
								<p>Palavras na lista: 150</p>
								<p>Palavras aprendidas: 100</p>
								<p>Palavras não aprendidas: 50</p>
							</div>
						</div>

						<div className="buttons">
							<button onClick={() => saveConfigs()}>Salvar</button>
							<button>Resetar palavras aprendidas</button>
						</div>
					</div>
				</StyledConfigs>
			)}
		</>
	);
};
