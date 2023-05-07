/////////////////////////////
// IMPORTS
/////////////////////////////
import express from "express";
import __dirname from "./utils/utils.js";
import router from './routes/index.js'
import errorHandler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found_handler.js";

/////////////////////////////
// VARIABLES
/////////////////////////////
let app = express();
let PORT = 8080;

/////////////////////////////
// MIDDLEWARES
/////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/////////////////////////////
// PUBLIC
/////////////////////////////
app.use(express.static(`../public`));

/////////////////////////////
// ROUTER
/////////////////////////////
app.use("/", router);

/////////////////////////////
// ERROR HANDLING
/////////////////////////////
app.use(errorHandler)
app.use(not_found_handler)

/////////////////////////////
// SERVER UP
/////////////////////////////
let ready = () => {
	console.log(`Server ready on port ${PORT}`);
};
app.listen(PORT, ready);
