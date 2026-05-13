import BaseRepository from '#repositories/base-repository.js';

/**
 * @typedef {import('#models/invitation.js').default} Invitation
 */

/**
 * @extends {BaseRepository<Invitation>}
 */
export default class InvitationRepository extends BaseRepository {
	/**
	 * @param {[fileName: string, ModelClass: typeof import('#models/invitation.js').default]} args
	 */
	constructor(...args) {
		super(...args);
	}

	/**
	 * @param {string|number} userId
	 * @returns {Promise<Invitation[]>}
	 */
	async getByUserIdAsync(userId) {
		const items = await this.getAllAsync();

		return items.filter(
			(/** @type {Invitation} */ item) =>
				item.senderId === userId || item.receiverId === userId,
		);
	}
}
