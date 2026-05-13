import BaseRepository from '#repositories/base-repository.js';

/**
 * @typedef {import('#models/profile.js').default} Profile
 */

/**
 * @extends {BaseRepository<Profile>}
 */
export default class ProfileRepository extends BaseRepository {
	/**
	 * @param {[fileName: string, ModelClass: typeof import('#models/profile.js').default]} args
	 */
	constructor(...args) {
		super(...args);
	}

	/**
	 * @param {string} query
	 * @returns {Promise<Profile[]>}
	 */
	async searchByKeywords(query) {
		const profiles = await this.getAllAsync();
		if (!query || query.trim() === '') {
			return profiles;
		}

		const searchTerms = new Set(query.toLowerCase().split(' '));

		return profiles.filter((/** @type {Profile} */ p) =>
			p.keywords.some((/** @type {string} */ k) => searchTerms.has(k.toLowerCase())),
		);
	}
}
