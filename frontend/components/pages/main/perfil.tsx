import { useRouter } from "next/router";
import { useState } from "react";
import { deleteCookies } from "../../../services/cookies";
import { StyledPerfil } from "./styles/styledPerfil";

export const Perfil = () => {
	const [showPerfil, setShowPerfil] = useState(false);
	const router = useRouter();

	const logout = async () => {
		await deleteCookies("token");
		router.push("/");
	};

	return (
		<StyledPerfil>
			<button role={"btn-open-perfil"} onClick={() => setShowPerfil(!showPerfil)}>
				Perfil
			</button>

			{showPerfil && (
				<div role={"perfil-buttons"} className='perfil-buttons'>
					<button onClick={() => logout()}>Sair</button>
				</div>
			)}
		</StyledPerfil>
	);
};
