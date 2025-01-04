<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

const email = ref('');
const password = ref('');
const error = ref('');
const { login, isAuthenticated } = useAuth();

const handleLogin = async () => {
  error.value = '';
  const success = await login({ email: email.value, password: password.value });

  if (!success) {
    error.value = 'Invalid credentials';
    return;
  }

  navigateTo('/');
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
