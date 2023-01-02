import Head from 'next/head';
import { useState } from 'react';
import { LoginForm } from '../components/loginForm/loginForm';
import { StyledMain } from '../styles/styledMain';

const Home = () => {
	const [showForm, setShowForm] = useState('');

	const changeFormState = (formName: string) => {
		if (showForm) return setShowForm('');
		setShowForm(formName);
	};

	return (
		<>
			<Head>
				<title>WordList</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<StyledMain>
				<h1 className='title'>WordList</h1>
				<p className='para'>Um site para memorizar palavras</p>

				<div className='menu'>
					<button onClick={() => changeFormState('login')}>Login</button>
					<button onClick={() => changeFormState('create')}>Criar Conta</button>
				</div>

				{showForm === 'login' && <LoginForm props={{ changeFormState }} />}
				{showForm === 'create' && <h1>Criar Conta</h1>}
			</StyledMain>
		</>
	);
};

export default Home;
