import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '../loginForm';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../services/mocks/server';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Login component', () => {
	const changeFormState = vi.fn();

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('Show error if input is empty', async () => {
		render(<LoginForm props={{ changeFormState }} />);

		const label = screen.getByText('Email');
		const div = screen.getByRole('email');
		const loginButton = screen.getByRole('button', { name: 'Login' });

		expect(div.className).not.toMatch(/error/i);
		expect(label).toHaveTextContent('Email');

		fireEvent.click(loginButton);

		expect(div.className).toMatch(/error/i);
		expect(label).toHaveTextContent('Este campo não pode ficar vazio');
	});

	// email / password is wrong
	test('Email/ password is wrong', async () => {
		render(<LoginForm props={{ changeFormState }} />);

		const div = screen.getByRole('email');
		const label = screen.getByText('Email');
		
		const email = screen.getByPlaceholderText('Email') as HTMLInputElement;
		const password = screen.getByPlaceholderText('Senha') as HTMLInputElement;
		await userEvent.type(email, 'wrong');
		await userEvent.type(password, 'wrong');

		const loginButton = screen.getByRole('button', { name: 'Login' });
		fireEvent.click(loginButton);

		await waitFor(() => {

			expect(div.className).toMatch(/error/i);
			expect(label).toHaveTextContent('Email ou senha incorreta');
		});
	});
});
