import path from 'node:path';
import url from 'node:url';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import InvitationController from '#controllers/invitation-controller.js';
import ProfileController from '#controllers/profile-controller.js';
import Invitation from '#models/invitation.js';
import Profile from '#models/profile.js';
import InvitationRepository from '#repositories/invitation-repository.js';
import ProfileRepository from '#repositories/profile-repository.js';
import createInvitationRoutes from '#routes/invitation-routes.js';
import createProfileRoutes from '#routes/profile-routes.js';
import InvitationService from '#services/invitation-service.js';
import ProfileService from '#services/profile-service.js';
import logger from '#utils/logger.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

const profileRepo = new ProfileRepository('profiles.json', Profile);
const invitationRepo = new InvitationRepository('invitations.json', Invitation);

const profileService = new ProfileService(profileRepo, invitationRepo);
const invitationService = new InvitationService(invitationRepo);

const profileController = new ProfileController(profileService);
const invitationController = new InvitationController(invitationService);

app.get('/', (_req, res) => res.redirect('/profiles'));
app.use('/', createProfileRoutes(profileController));
app.use('/', createInvitationRoutes(invitationController));

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
	logger.info('SIGTERM signal received: closing HTTP server');
	process.exit(0);
});

process.on('SIGINT', () => {
	logger.info('SIGINT signal received: closing HTTP server');
	process.exit(0);
});
