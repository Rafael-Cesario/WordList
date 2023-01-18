import { describe, test, expect } from 'vitest';
import { server } from '../mocks/server';
import { queriesList } from './queriesList';

describe('Queries list', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('Create a new list', async () => {
		const newList = { listName: 'Test', owner: 'User' };
		const response = await queriesList.createList(newList);
		expect(response).toHaveProperty('message');
		expect(response.message).toBe('List created');
	});
});
