import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { verifyErrors } from '../verifyErrors';

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

describe('Utils, verify errors', () => {
	beforeEach(() => {
		render(<DummyRender />);
	});

	test('Return false if there is no errors', () => {
		const errors = verifyErrors({ email: undefined });
		expect(errors).toBe(false);
	});

	test('Return true if there is a error', () => {
		const errors = verifyErrors({ email: 'email: error here ' });
		expect(errors).toBe(true);
	});
});
