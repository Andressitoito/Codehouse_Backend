import Stripe from 'stripe'

export class PaymentsService {
 constructor() {

  this.stripe = new Stripe(process.env.STRIPE_SECCRet_KEY)
 }

 createPaymentIntent = async (data) => {
  return this.stripe.paymentIntents.create(data)
 }
}