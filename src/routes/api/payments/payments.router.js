/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import { PaymentsService } from "../../../service/payments.service.js";

const router = Router();

const products = [
 { id: 1, name: "papas", price: 1000 },
 { id: 1, name: "papas", price: 1000 },
 { id: 1, name: "papas", price: 1000 },
 { id: 1, name: "papas", price: 1000 },
 { id: 1, name: "papas", price: 1000 },
];

router.post("/payments-intents", async (req, res) => {
 const productRequested = products.find(
  (prod) => prod.id === Number(req, query.id)
 );

 if (!productRequested) {
  return res.status(404).send({ status: "error", error: "Product not found" });
 }

 const paymentIntentInfo = {
  amount: productRequested.price,
  currency: "usd",
 };

 const service = new PaymentService()


 let result = await service.createPaymentIntent(paymentIntentInfo)

 console.log(result)

 res.status(200).json({
  status: 200,
  payload: result,
 });
});

export default router;
