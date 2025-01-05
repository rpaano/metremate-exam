<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key");

const redirectToCheckout = async () => {
  const stripe = await stripePromise;
  const sessionId = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "product_123" }] }),
  }).then((res) => res.json());

  stripe?.redirectToCheckout({ sessionId });
};
</script>

<template>
  <button @click="redirectToCheckout">Pay Now</button>
</template>
