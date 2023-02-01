import mongoose from 'mongoose';
import { expect, describe, test, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../utils/queriesList';

const queriesList = new QueriesList();

describe('Change list name', () => {
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

	test('change name', async () => {
		await queriesList.createList({ listName: 'name', owner: 'UserEmail' });
		const changeListName = await queriesList.changeListName({ newName: 'name01', oldName: 'name', owner: 'UserEmail' });
		const message = changeListName.data.changeListName.message;
		expect(message).toBe('list updated');

		const getList = await queriesList.getLists({ owner: 'UserEmail' });
		const lists = getList.data.getLists.lists;
		expect(lists.includes('name01')).toBe(true);
	});

	test('list not found', async () => {
		await queriesList.createList({ listName: 'name', owner: 'UserEmail' });
		const changeListName = await queriesList.changeListName({ newName: 'name01', oldName: 'NotFound', owner: 'UserEmail' });
		const error = changeListName.errors![0].message;
		expect(error).toBe('List not found');
	});
});
