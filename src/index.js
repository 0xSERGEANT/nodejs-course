import path from 'node:path';
import url from 'node:url';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

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
