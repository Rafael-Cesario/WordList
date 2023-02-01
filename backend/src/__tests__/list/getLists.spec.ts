import mongoose from 'mongoose';
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../utils/queriesList';

const queriesList = new QueriesList();

describe('Get lists query', () => {
	beforeAll(async () => {
		await startServer(0);
		await startDatabase();
	});

	afterEach(async () => {
		await ListModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connections[0].dropDatabase();
		await mongoose.connections[0].close();
	});

	test('Return all the lists', async () => {
		await queriesList.createList({ listName: 'list01', owner: 'UserEmail' });
		await queriesList.createList({ listName: 'list02', owner: 'UserEmail' });

		const response = await queriesList.getLists({ owner: 'UserEmail' });
		const lists = response.data.getLists.lists;

		expect(lists.length).toBe(2);
		expect(lists.includes('list01')).toBe(true);
		expect(lists.includes('list02')).toBe(true);
	});

	test('Owner has no lists', async () => {
		const response = await queriesList.getLists({ owner: 'UserWithoutlists' });
		const lists = response.data.getLists.lists;
		expect(lists.length).toBe(0);
		expect(lists).toEqual([]);
	});
});
