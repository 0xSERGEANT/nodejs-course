/**
 * @typedef {import('#repositories/invitation-repository.js').default} InvitationRepository
 * @typedef {import('#models/invitation.js').default} Invitation
 */

export default class InvitationService {
	/**
	 * @param {InvitationRepository} invitationRepository
	 */
	constructor(invitationRepository) {
		this.invitationRepository = invitationRepository;
	}

	/**
	 * @param {string|number} userId
	 * @returns {Promise<Invitation[]>}
	 */
	async getInvitationsForUser(userId) {
		return await this.invitationRepository.getByUserIdAsync(userId);
	}

	/**
	 * @param {string|number} senderId
	 * @param {string|number} receiverId
	 */
	async sendInvitation(senderId, receiverId) {
		const invitations = await this.invitationRepository.getAllAsync();

		const newInv = {
			id: Date.now().toString(),
			senderId,
			receiverId,
			status: /** @type {const} */ ('pending'),
		};

		invitations.push(/** @type {any} */ (newInv));

		await this.invitationRepository.saveAllAsync(invitations);
		return newInv;
	}
}
