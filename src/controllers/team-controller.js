import { teamData } from '../data/team-data.js';

// @ts-ignore
export const getAllMembers = (req, res) => {
	res.render('team', { members: teamData });
};

// @ts-ignore
// eslint-disable-next-line consistent-return
export const getMemberById = (req, res) => {
	const member = teamData.find((m) => m.id === Number.parseInt(req.params.id));
	if (!member) {
		return res.status(404).send('Member not found');
	}
	res.render('member', { member });
};
