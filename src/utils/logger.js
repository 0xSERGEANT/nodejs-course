import pino from 'pino';

/** @returns {import('pino').TransportSingleOptions} */
function buildPrettyTransport() {
	return {
		target: 'pino-pretty',
		options: {
			colorize: true,
			colorizeObjects: true,
			translateTime: 'yyyy-mm-dd HH:MM:ss',
			ignore: 'pid,hostname',
			messageFormat: '{msg}',
		},
	};
}

const logger = pino({
	level: 'info',
	transport: buildPrettyTransport(),
	serializers: {
		err: pino.stdSerializers.err,
		req: pino.stdSerializers.req,
		res: pino.stdSerializers.res,
	},
});

export default logger;
