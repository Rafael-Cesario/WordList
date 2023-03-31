import { test, vi, expect } from 'vitest';
import { sendNotification } from '../sendNotification';

test('Show notification and remove after timeout', () => {
	vi.useFakeTimers();

	const setNotification = vi.fn();
	sendNotification(setNotification);

	expect(setNotification).toHaveBeenCalledWith(true);

	vi.runAllTimers();
	expect(setNotification).toHaveBeenCalledWith(false);
});
