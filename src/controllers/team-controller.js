import { teamData } from '#data/team-data.js';

/**
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
export const getAllMembers = (_req, res) => {
	res.render('team', { members: teamData });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getMemberById = (req, res) => {
	const member = teamData.find((m) => m.id === Number.parseInt(req.params.id));
	if (!member) {
		res.status(404).send('Member not found');
		return;
	}

	res.render('member', { member });
};
