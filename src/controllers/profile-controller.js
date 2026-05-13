import logger from '#utils/logger.js';

/**
 * @typedef {import('#services/profile-service.js').default} ProfileService
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

export default class ProfileController {
	/**
	 * @param {ProfileService} profileService
	 */
	constructor(profileService) {
		this.profileService = profileService;
	}

	/**
	 * @param {Request} _req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	async listProfiles(_req, res) {
		try {
			const currentUserId = '1';
			const profiles = await this.profileService.getAllProfilesForViewer(currentUserId);
			res.render('profiles/list', { profiles, currentUserId });
		} catch (error) {
			logger.error(error);
			res.status(500).send('Error loading profiles');
		}
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response | void>}
	 */
	async viewProfile(req, res) {
		try {
			const profileId = /** @type {string} */ (req.params.id);
			const currentUserId = '1';
			const profile = await this.profileService.getProfileForViewer(profileId, currentUserId);

			if (!profile) {
				res.status(404).send('Profile not found');
				return;
			}

			res.render('profiles/detail', { profile });
		} catch (error) {
			logger.error(error);
			res.status(500).send('Error loading profile');
		}
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	async renderSearch(req, res) {
		try {
			const query = /** @type {string} */ (req.query.q) || '';
			const currentUserId = '1';
			const results = await this.profileService.searchProfiles(query, currentUserId);

			res.render('profiles/search', { results, query });
		} catch (error) {
			logger.error(error);
			res.status(500).send('Error searching profiles');
		}
	}
}
