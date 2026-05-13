/**
 * @typedef {import('#repositories/profile-repository.js').default} ProfileRepository
 * @typedef {import('#repositories/invitation-repository.js').default} InvitationRepository
 * @typedef {import('#models/profile.js').default} Profile
 */

export default class ProfileService {
	/**
	 * @param {ProfileRepository} profileRepository
	 * @param {InvitationRepository} invitationRepository
	 */
	constructor(profileRepository, invitationRepository) {
		this.profileRepository = profileRepository;
		this.invitationRepository = invitationRepository;
	}

	/**
	 * @param {string|number} profileId
	 * @param {string|number} viewerId
	 * @returns {Promise<ReturnType<Profile['getViewData']> | null>}
	 */
	async getProfileForViewer(profileId, viewerId) {
		const profile = await this.profileRepository.getByIdAsync(profileId);
		if (!profile) {
			return null;
		}

		const invitations = await this.invitationRepository.getAllAsync();
		return profile.getViewData(viewerId, invitations);
	}

	/**
	 * @param {string|number} viewerId
	 * @returns {Promise<ReturnType<Profile['getViewData']>[]>}
	 */
	async getAllProfilesForViewer(viewerId) {
		const profiles = await this.profileRepository.getAllAsync();
		const invitations = await this.invitationRepository.getAllAsync();
		return profiles.map((p) => p.getViewData(viewerId, invitations));
	}

	/**
	 * @param {string} query
	 * @param {string|number} viewerId
	 * @returns {Promise<ReturnType<Profile['getViewData']>[]>}
	 */
	async searchProfiles(query, viewerId) {
		const profiles = await this.profileRepository.searchByKeywords(query);
		const invitations = await this.invitationRepository.getAllAsync();
		return profiles.map((p) => p.getViewData(viewerId, invitations));
	}
}
