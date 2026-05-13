/**
 * @typedef {import('#controllers/profile-controller').default} ProfileController
 */

import express from 'express';

/**
 * @param {ProfileController} profileController
 * @returns {express.Router}
 */
export default function createProfileRoutes(profileController) {
	const router = express.Router();

	router.get('/profiles', profileController.listProfiles.bind(profileController));
	router.get('/profiles/:id', profileController.viewProfile.bind(profileController));
	router.get('/search', profileController.renderSearch.bind(profileController));

	return router;
}
