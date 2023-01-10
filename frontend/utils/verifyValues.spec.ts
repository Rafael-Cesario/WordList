import { describe, test, expect } from 'vitest';
import { verifyValues } from './verifyValues';

const sendErrorMock = (error: string) => {
	return error;
};

const removeErrorMock = (error: string) => {
	return error;
};

describe('Utils, verify Values', () => {
	test('Return false if there is no errors', () => {
		const errors = verifyValues({ email: undefined, password: undefined }, sendErrorMock, removeErrorMock);
		expect(errors).toBe(false);
	});

	test('Return true if there is a error', () => {
		const errors = verifyValues({ email: 'error here ' }, sendErrorMock, removeErrorMock);
		expect(errors).toBe(true);
	});
});
