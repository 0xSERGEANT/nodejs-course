/**
 * @typedef {Object} Invitation
 * @property {string|number} senderId
 * @property {string|number} receiverId
 * @property {string} status
 */

/**
 * @typedef {Object} ProfileData
 * @property {string|number} id
 * @property {string[]} [keywords]
 * @property {Record<string, any>} [publicInfo]
 * @property {Record<string, any>} [privateInfo]
 */

/**
 * @typedef {Object} ProfileViewData
 * @property {string|number} id
 * @property {string[]} keywords
 * @property {Record<string, any>} publicInfo
 * @property {Record<string, any>} [privateInfo]
 */

export default class Profile {
	/**
	 * @param {ProfileData} data
	 */
	constructor(data) {
		this.id = data.id;
		this.keywords = data.keywords || [];
		this.publicInfo = data.publicInfo || {};
		this.privateInfo = data.privateInfo || {};
	}

	/**
	 * @param {string|number} viewerId
	 * @param {Invitation[]} invitations
	 * @returns {boolean}
	 */
	canViewPrivateInfo(viewerId, invitations) {
		if (this.id === viewerId) {
			return true;
		}

		return invitations.some((inv) => {
			const isParticipants =
				(inv.senderId === viewerId && inv.receiverId === this.id) ||
				(inv.receiverId === viewerId && inv.senderId === this.id);

			return isParticipants && inv.status === 'accepted';
		});
	}

	/**
	 * @param {string|number} viewerId
	 * @param {Invitation[]} invitations
	 * @returns {ProfileViewData}
	 */
	getViewData(viewerId, invitations) {
		/** @type {ProfileViewData} */
		const data = {
			id: this.id,
			keywords: this.keywords,
			publicInfo: this.publicInfo,
		};

		if (this.canViewPrivateInfo(viewerId, invitations)) {
			data.privateInfo = this.privateInfo;
		}

		return data;
	}
}
