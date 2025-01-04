<template>
  <div>
    <h1>metremate</h1>
    <p>Welcome, {{ user?.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const { user, logout } = useAuth();

definePageMeta({
  middleware: [
    'auth',
  ],
});
</script>
