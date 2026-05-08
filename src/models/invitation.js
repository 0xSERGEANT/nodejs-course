/**
 * @typedef {Object} InvitationData
 * @property {string|number} id
 * @property {string|number} senderId
 * @property {string|number} receiverId
 * @property {'pending'|'accepted'|'rejected'} [status]
 */

export default class Invitation {
	/**
	 * @param {InvitationData} data
	 */
	constructor(data) {
		this.id = data.id;
		this.senderId = data.senderId;
		this.receiverId = data.receiverId;
		this.status = data.status || 'pending';
	}

	/**
	 * @param {string|number} userId
	 * @returns {boolean}
	 */
	isAcceptedFor(userId) {
		return (
			(this.senderId === userId || this.receiverId === userId) && this.status === 'accepted'
		);
	}

	/**
	 * @returns {void}
	 */
	accept() {
		this.status = 'accepted';
	}
}
