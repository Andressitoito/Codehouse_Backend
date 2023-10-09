import winston from "winston";

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       level: 'http',
//     }),
//   ],
// });

// const logger = winston.createLogger({
//  transports: [
//    new winston.transports.Console({
//      level: 'http',
//    }),
//    new winston.transports.File({filename: './errors.log', level: 'warn'})
//  ],
// });

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		debug: 4,
	},
	colors: {
		fatal: "red",
		error: "yellow",
		warn: "yellow",
		info: "blue",
		debug: "cyan",
	},
};

const logger = winston.createLogger({
	levels: customLevelOptions.levels,
	transports: [
		new winston.transports.Console({
			level: "info",
			format: winston.format.combine(
				winston.format.colorize({ colors: customLevelOptions.colors }),
				winston.format.simple()
			),
		}),
		new winston.transports.File({
			filename: "./errors.log",
			level: "warn",
			format: winston.format.simple(),
		}),
	],
});

const addLogger = (req, res, next) => {
	req.logger = logger;

	req.logger.info(
		`${req.method} en ${req.url} - ${new Date().toLocaleString()}`
	);
	next();
};

export { logger, addLogger };
