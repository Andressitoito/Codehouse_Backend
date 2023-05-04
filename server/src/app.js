/////////////////////////////
// IMPORTS
/////////////////////////////
import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils/utils.js";

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
app.use(express.static(`${__dirname}/public`));

/////////////////////////////
// ROUTER
/////////////////////////////
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

/////////////////////////////
// ERROR HANDLING
/////////////////////////////
app.use((err, req, res, next) => {
 console.error(err)
 res.status(500).send({
  status: 500,
  success: false,
  error: err.toString()
 })
})

/////////////////////////////
// SERVER UP
/////////////////////////////
let ready = () => {
	console.log(`Server ready on port ${PORT}`);
};
app.listen(PORT, ready);
