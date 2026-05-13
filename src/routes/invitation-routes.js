/**
 * @typedef {import('#controllers/invitation-controller').default} InvitationController
 */

import express from 'express';

/**
 *
 * @param {InvitationController} invitationController
 * @returns {express.Router}
 */
export default function createInvitationRoutes(invitationController) {
	const router = express.Router();
	router.get('/invitations', invitationController.listMyInvitations.bind(invitationController));
	return router;
}
