import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { removeError, sendError } from '../error';
import { render, screen } from '@testing-library/react';

const DummyRender = () => {
	return (
		<div>
			<label htmlFor='email' data-name='Email'>
				Email
			</label>
			<input type='text' id='email' placeholder='Email' />
		</div>
	);
};

describe('Utils, error', () => {
	test('Change the input style and label text', () => {
		render(<DummyRender />);
		sendError('email: Error here');

		const input = screen.getByPlaceholderText('Email');
		const label = screen.getByText('Error here');
		const divClass = input.parentElement?.className;

		expect(label).toHaveTextContent('Error here');
		expect(divClass).toBe('error');
	});

	test('Remove the style and change back the label text', () => {
		render(<DummyRender />);
		sendError('email: Error here');
		removeError('email');

		const input = screen.getByPlaceholderText('Email');
		const label = screen.getByText('Email');
		const divClass = input.parentElement?.className;

		expect(label).toHaveTextContent('Email');
		expect(divClass).toBe('');
	});
});
