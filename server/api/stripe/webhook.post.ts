// import Stripe from "stripe";
// import { defineEventHandler, readBody, getHeader } from "h3";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2022-11-15",
// });

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const signature = getHeader(event, "stripe-signature");

//   if (!signature) {
//     return {
//       status: 400,
//       message: "Missing Stripe signature.",
//     };
//   }

//   try {
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

//     const eventObject = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       webhookSecret
//     );

//     switch (eventObject.type) {
//       case "invoice.payment_succeeded":
//         const invoice = eventObject.data.object as Stripe.Invoice;
//         // Handle subscription cancellation

//         console.log("Payment succeeded for invoice:", invoice.id);
//         break;

//       case "invoice.payment_failed":
//         const failedInvoice = eventObject.data.object as Stripe.Invoice;
//         // TODO: change to toaster
//         console.log("Payment failed for invoice:", failedInvoice.id);
//         break;

//       case "customer.subscription.deleted":
//         const subscription = eventObject.data.object as Stripe.Subscription;
//         // TODO: change to toaster
//         console.log("Subscription deleted:", subscription.id);
//         break;

//       default:
//         console.log(`Unhandled event type: ${eventObject.type}`);
//     }

//     return { status: 200, message: "Webhook handled successfully." };
//   } catch (error: any) {
//     console.error("Error handling webhook:", error.message);

//     return {
//       status: 400,
//       message: `Webhook Error: ${error.message}`,
//     };
//   }
// });
