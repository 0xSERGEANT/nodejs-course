import logger from '#utils/logger.js';

/**
 * @typedef {import('#services/invitation-service.js').default} InvitationService
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

export default class InvitationController {
	/**
	 * @param {InvitationService} invitationService
	 */
	constructor(invitationService) {
		this.invitationService = invitationService;
	}

	/**
	 * @param {Request} _req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	async listMyInvitations(_req, res) {
		try {
			const userId = '1';
			const invitations = await this.invitationService.getInvitationsForUser(userId);
			res.render('invitations/list', { invitations });
		} catch (error) {
			logger.error(error);
			res.status(500).send('Error loading invitations');
		}
	}
}
