import { describe, test, expect } from 'vitest';
import { verifyErrors } from '../verifyErrors';

const sendErrorMock = (error: string) => {
	return error;
};

const removeErrorMock = (error: string) => {
	return error;
};

describe('Utils, verify errors', () => {
	test('Return false if there is no errors', () => {
		const errors = verifyErrors({ email: undefined, password: undefined }, sendErrorMock, removeErrorMock);
		expect(errors).toBe(false);
	});

	test('Return true if there is a error', () => {
		const errors = verifyErrors({ email: 'error here ' }, sendErrorMock, removeErrorMock);
		expect(errors).toBe(true);
	});
});
