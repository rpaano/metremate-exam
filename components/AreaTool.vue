<script lang="ts" setup>
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (event: 'onToggle', isVisible: boolean): void;
}>();

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
  emit('onToggle', isVisible.value);
};
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p v-if="isVisible">Content is now visible!</p>
  </div>
</template>

