import mongoose from 'mongoose';
import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../app';
import { startDatabase } from '../database';
import { ListModel } from '../models/listModel';
import { QueriesList } from './utils/queriesList';

const queriesList = new QueriesList();

describe('Creat List Query', () => {
	beforeAll(async () => {
		await startServer();
		await startDatabase();
	});

	afterEach(async () => {
		await ListModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connections[0].dropDatabase();
		await mongoose.connections[0].close();
	});

	test('A list with the same name cannot be created', async () => {
		const newList = { listName: 'sameName', owner: 'UserEmail' };
		await queriesList.createList(newList);
		const response = await queriesList.createList(newList);

		expect(response.errors![0]).toHaveProperty('message');
		expect(response.errors![0].message).toBe('create list: A list with the same name already exist');
	});

	test('Create a new list', async () => {
		const newList = { listName: 'sameName', owner: 'UserEmail' };
		const response = await queriesList.createList(newList);
		const list = await ListModel.findOne({ ...newList });
		expect(list!.owner).toBe('useremail');
		expect(response.data).toHaveProperty('createList');
		expect(response.data.createList.message).toBe('New list created');
	});

	test('Missing arguments', async () => {
		const newList = { listName: '', owner: '' };
		const response = await queriesList.createList(newList);

		expect(response.errors![0].message).toBe('create list: List validation failed: owner: owner is required, listName: listName is required');
	});
});
