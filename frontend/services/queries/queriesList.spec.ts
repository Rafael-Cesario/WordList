import { describe, test, expect, expectTypeOf } from 'vitest';
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

	test('Create list, error', async () => {
		const newList = { listName: '', owner: '' };
		const response = await queriesList.createList(newList);
		expect(response).toHaveProperty('error');
		expect(response.error).toMatch(/ListName\/owner was not provided/);
	});

	test('getLists', async () => {
		const response = await queriesList.getLists('userEmail');
		expect(response).toHaveProperty('lists');
		expectTypeOf(response.lists).toBeArray();
	});

	test('getLists error', async () => {
		const response = await queriesList.getLists('');
		expect(response).toHaveProperty('error');
		expect(response.error).toMatch(/Owner was not provided/);
	});

	test('Change list name', async () => {
		const response = await queriesList.changeListName({ newName: 'new', oldName: 'old', owner: 'userEmail' });
		expect(response).toHaveProperty('message');
		expect(response.message).toMatch(/List name changed/i);
	});

	test('Change list name, error', async () => {
		const response = await queriesList.changeListName({ newName: '', oldName: '', owner: '' });
		expect(response).toHaveProperty('error');
		expect(response.error).toMatch(/Owner was not provided/i);
	});
});
