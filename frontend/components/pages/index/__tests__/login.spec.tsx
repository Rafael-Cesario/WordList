import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LoginForm } from '../loginForm';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Login component', () => {
	const changeFormState = vi.fn();

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
});
