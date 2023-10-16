import dotenv from "dotenv";
import Commander from "../utils/commander.js";
import MongoSingleton from "./MongoSingleton.js";
import __dirname from "../utils/utils.js";
import { join } from "path";
const { mode } = Commander.opts();

const upOneFolder = join(__dirname, "..");

dotenv.config({
	path:
		mode === "development"
			? join(upOneFolder, ".env.development")
			: join(upOneFolder, ".env.production"),
});

const config = {
	gmail_user_app: process.env.GMAIL_USER_APP,
	gmail_pass_app: process.env.GMAIL_PASS_APP,
	privateKeyJwt: "palabraSecretaCoder",
	PORT: process.env.PORT || 8000,
	persistence: process.env.PERSISTENCE,

	connectDB: async () => MongoSingleton.getInstance(),
};

export default config;
