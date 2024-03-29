/////////////////////////////
// IMPORTS
/////////////////////////////
// import logger from "morgan";
import express from "express";
import __dirname from "./utils/utils.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found_handler.js";
import send_navbar_data from "./middlewares/send_navbar_data.js";
import handlebars from "handlebars";
import exphbs from "express-handlebars";
import "dotenv/config";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import passport_local from "./config/passport_local.js";
import config from "./config/config.js";
import cors from "cors";
import errorMiddleware from "./middlewares/error_middleware.js";
import { addLogger } from "./config/logger.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

/////////////////////////////
// VARIABLES
/////////////////////////////
let server = express();

/////////////////////////////
// ENGINE + VIEWS
/////////////////////////////
const handlebarsInstance = exphbs.create({
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
});
server.engine("handlebars", handlebarsInstance.engine);
server.set("view engine", "handlebars");
server.set("views", `${__dirname}/views`);

/////////////////////////////
// PUBLIC
/////////////////////////////
server.use("/public", express.static(`../public`));

/////////////////////////////
// MIDDLEWARES
/////////////////////////////
passport_local();
server.use(passport.initialize());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// server.use(logger("dev"));
server.use(addLogger);

server.use(
	expressSession({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_LINK,
			ttl: 604800,
		}),
		secret: process.env.SECRET_SESSION,
		resave: true,
		saveUninitialized: true,
	})
);
server.use(passport.session());
server.use(cookieParser(process.env.SECRET_COOKIE));

/////////////////////////////
// SEND NAVBAR DATA
/////////////////////////////
server.use("/", send_navbar_data);

/////////////////////////////
// HELPERS
/////////////////////////////
handlebars.registerHelper("multiply", (a, b) => {
	return a * b;
});
handlebars.registerHelper("sum", (a, b) => {
	return a + b;
});

/////////////////////////////
// SWAGGER
/////////////////////////////
const swaggerOptions = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Grass and Plants documentation",
			description: "API enpoints documented and tests",
		},
	},
	apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsDoc(swaggerOptions);
server.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

/////////////////////////////
// ROUTER
/////////////////////////////
server.use("/", router);

/////////////////////////////
// CORS
/////////////////////////////
server.use(cors());

/////////////////////////////
// DATABASE
/////////////////////////////
config.connectDB();

// connect(process.env.MONGO_LINK)
// 	.then(() => console.log("Connected to database"))
// 	.catch((err) => console.log(err));

/////////////////////////////
// ERROR HANDLING
/////////////////////////////
server.use(errorHandler);
server.use(errorMiddleware);
server.use(not_found_handler);

export default server;
