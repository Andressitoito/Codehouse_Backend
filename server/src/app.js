/////////////////////////////
// IMPORTS
/////////////////////////////
import express from "express";
import __dirname from "./utils/utils.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found_handler.js";
import { engine } from "express-handlebars";
import logger from "morgan";
import send_navbar_data from "./middlewares/send_navbar_data.js";
import handlebars from 'handlebars'

/////////////////////////////
// VARIABLES
/////////////////////////////
let server = express();

/////////////////////////////
// ENGINE + VIEWS
/////////////////////////////
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", `${__dirname}/views`);

/////////////////////////////
// PUBLIC
/////////////////////////////
server.use('/public', express.static(`../public`));

/////////////////////////////
// MIDDLEWARES 
/////////////////////////////
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger("dev"));

/////////////////////////////
// SEND NAVBAR DATA
/////////////////////////////
server.use('/', send_navbar_data)

/////////////////////////////
// HELPERS
/////////////////////////////
handlebars.registerHelper('multiply', (a, b) => {
 return a * b
})
handlebars.registerHelper('sum', (a, b) => {
 return a + b
})

/////////////////////////////
// ROUTER
/////////////////////////////
server.use("/", router);

/////////////////////////////
// ERROR HANDLING
/////////////////////////////
server.use(errorHandler);
server.use(not_found_handler);

export default server;

