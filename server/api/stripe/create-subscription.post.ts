// import Stripe from "stripe";
// import { defineEventHandler, readBody } from "h3";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2022-11-15",
// });

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);

//   const { customerId, paymentMethodId, priceId } = body;

//   if (!customerId || !paymentMethodId || !priceId) {
//     return {
//       status: 400,
//       message: "Missing required parameters: customerId, paymentMethodId, priceId.",
//     };
//   }

//   try {
//     await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

//     await stripe.customers.update(customerId, {
//       invoice_settings: { default_payment_method: paymentMethodId },
//     });

//     const subscription = await stripe.subscriptions.create({
//       customer: customerId,
//       items: [{ price: priceId }],
//       expand: ["latest_invoice.payment_intent"],
//     });

//     return {
//       status: 200,
//       subscriptionId: subscription.id,
//       clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
//     };
//   } catch (error: any) {
//     // TODO: change to toaster
//     console.error("Error creating subscription:", error);

//     return {
//       status: 500,
//       message: error.message || "An error occurred while creating the subscription.",
//     };
//   }
// });
