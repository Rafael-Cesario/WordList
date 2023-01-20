import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import { CreateAccountForm } from '../createAccountForm';
import userEvent from '@testing-library/user-event';

describe('Create account form component', () => {
	const user = userEvent.setup();

	test('Submit with empty fields shows a error', async () => {
		const changeFormState = vi.fn();
		render(<CreateAccountForm props={{ changeFormState }} />);

		const submitB = screen.getByRole('button', { name: /Criar conta/i });
		const div = screen.getByRole('email');
		const label = div.childNodes[0];
		const input = div.childNodes[1] as HTMLInputElement;

		expect(label).toHaveTextContent('Email');

		fireEvent.click(submitB);

		expect(div.className).toMatch(/error/i);
		expect(label).toHaveTextContent('Este campo não pode ficar vazio');

		await user.type(input, 'user@email.com');

		fireEvent.click(submitB);

		expect(div.className).not.toMatch(/error/i);
		expect(label).toHaveTextContent('Email');
	});

	test('Show notification', async () => {
		const changeFormState = vi.fn();
		render(<CreateAccountForm props={{ changeFormState }} />);

		const typeOnInput = async (divName: string, text: string) => {
			const div = screen.getByRole(divName);
			const input = div.childNodes[0] as HTMLInputElement;
			await user.type(input, text);
		};

		await typeOnInput('email', 'user@email');
		await typeOnInput('name', 'userName');
		await typeOnInput('password', 'userPassword');
		await typeOnInput('confirmPassword', 'userPassword');

		const submitB = screen.getByRole('button', { name: /Criar conta/i });
		fireEvent.click(submitB);

		await waitFor(() => {
			const notification = screen.getByRole('message');
			expect(notification).toBeInTheDocument();
		});
	});
});
