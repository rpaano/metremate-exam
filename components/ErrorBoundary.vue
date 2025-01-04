<script setup lang="ts">
import { ref } from 'vue';

const hasError = ref<boolean>(false);
const errorMessage = ref<string>('');

const resetError = (): void => {
  hasError.value = false;
  errorMessage.value = '';
};

const errorCaptured = (err: Error, vm: Vue.ComponentPublicInstance, info: string): boolean => {
  hasError.value = true;
  errorMessage.value = err.message || 'Unknown error';
  return false;
};

defineExpose({
  errorCaptured,
});
</script>

<template>
  <div>
    <slot v-if="!hasError"></slot>
    <div v-else class="error-message">
      <h2>An error occurred in the component:</h2>
      <p>{{ errorMessage }}</p>
      <button @click="resetError">Try Again</button>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  padding: 20px;
  border: 1px solid red;
  background-color: #f8d7da;
  border-radius: 4px;
}
</style>
