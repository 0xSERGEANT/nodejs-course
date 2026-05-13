import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @template { { id?: string | number } } T
 */
export default class BaseRepository {
	/**
	 * @param {string} fileName
	 * @param {new (data: any) => T} ModelClass
	 */
	constructor(fileName, ModelClass) {
		/** @type {string} */
		this.dataPath = path.join(__dirname, '..', 'data', fileName);

		/** @type {new (data: any) => T} */
		this.ModelClass = ModelClass;
	}

	/**
	 * @returns {T[]}
	 */
	getAllSync() {
		const data = fs.readFileSync(this.dataPath, 'utf8');
		/** @type {any[]} */
		const parsedData = JSON.parse(data);
		return parsedData.map((item) => new this.ModelClass(item));
	}

	/**
	 * @param {(error: Error | null, items?: T[]) => void} callback
	 * @returns {void}
	 */
	getAllCallback(callback) {
		// eslint-disable-next-line consistent-return
		fs.readFile(this.dataPath, 'utf8', (error, data) => {
			if (error) {
				return callback(error);
			}
			try {
				const items = JSON.parse(data).map(
					(/** @type {any} */ item) => new this.ModelClass(item),
				);
				callback(null, items);
			} catch (parseError) {
				callback(parseError instanceof Error ? parseError : new Error(String(parseError)));
			}
		});
	}

	/**
	 * @returns {Promise<T[]>}
	 */
	getAllPromise() {
		return fsPromises.readFile(this.dataPath, 'utf8').then((data) => {
			return JSON.parse(data).map((/** @type {any} */ item) => new this.ModelClass(item));
		});
	}

	/**
	 * @returns {Promise<T[]>}
	 */
	async getAllAsync() {
		const data = await fsPromises.readFile(this.dataPath, 'utf8');
		return JSON.parse(data).map((/** @type {any} */ item) => new this.ModelClass(item));
	}

	/**
	 * @param {string|number} id
	 * @returns {Promise<T | null>}
	 */
	async getByIdAsync(id) {
		const items = await this.getAllAsync();
		return items.find((/** @type {T} */ item) => item.id === id) || null;
	}

	/**
	 * @param {T[]} items
	 * @returns {Promise<void>}
	 */
	async saveAllAsync(items) {
		await fsPromises.writeFile(this.dataPath, JSON.stringify(items, null, 2), 'utf8');
	}
}
