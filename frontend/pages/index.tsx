import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CreateAccountForm } from '../components/forms/createAccountForm';
import { LoginForm } from '../components/forms/loginForm';
import { getCookies } from '../services/cookies';
import { StyledIndex } from '../styles/styledIndex';

const Home = () => {
	const [showForm, setShowForm] = useState('');
	const router = useRouter();

	const changeFormState = (formName: string) => {
		if (showForm === formName) return setShowForm('');
		setShowForm(formName);
	};

	const userAuthentication = async () => {
		const response = await getCookies('token');
		const authenticated = response.data.cookie;
		if (authenticated) router.push('/main');
	};

	useEffect(() => {
		userAuthentication();
	}, []);

	return (
		<>
			<Head>
				<title>WordList</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<StyledIndex>
				<h1 className='title'>WordList</h1>
				<p className='para'>Um site para memorizar palavras</p>

				<div className='menu'>
					<button onClick={() => changeFormState('login')}>Login</button>
					<button onClick={() => changeFormState('create')}>Criar Conta</button>
				</div>

				{showForm === 'login' && <LoginForm props={{ changeFormState }} />}
				{showForm === 'create' && <CreateAccountForm props={{ changeFormState }} />}
			</StyledIndex>
		</>
	);
};

export default Home;
