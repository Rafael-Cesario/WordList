import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { startServer } from '../app';
import { startDatabase } from '../database';
import { ListModel } from '../models/listModel';
import { QueriesList } from './utils/queriesList';

const queriesList = new QueriesList();

describe('Delete list', () => {
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

	test('Delete list', async () => {
		const createList = async () => {
			await queriesList.createList({ listName: 'List01', owner: 'UserEmail' });
			const getLists = await queriesList.getLists({ owner: 'UserEmail' });
			const lists = getLists.data.getLists.lists;
			expect(lists.includes('list01')).toBe(true);
		};

		await createList();

		const deleteList = await queriesList.deleteList({ owner: 'UserEmail', listName: 'List01' });
		const message = deleteList.data.deleteList.message;
		expect(message).toBe('List deleted');

		const getLists = await queriesList.getLists({ owner: 'UserEmail' });
		const lists = getLists.data.getLists.lists;
		expect(lists.length).toBe(0);
	});
});
