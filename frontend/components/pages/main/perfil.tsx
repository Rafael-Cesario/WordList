import { useRouter } from 'next/router';
import { useState } from 'react';
import { deleteCookies } from '../../../services/cookies';
import { StyledPerfil } from './styledPerfil';

export const Perfil = () => {
	const [showPerfil, setShowPerfil] = useState(false);
	const router = useRouter();

	const logout = async () => {
		await deleteCookies('token');
		await deleteCookies('user');
		router.push('/');
	};

	return (
		<StyledPerfil>
			<button onClick={() => setShowPerfil(!showPerfil)}>Perfil</button>

			{showPerfil && (
				<div className='perfil-buttons'>
					<button onClick={() => logout()}>Sair</button>
				</div>
			)}
		</StyledPerfil>
	);
};
