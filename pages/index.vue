<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useCurrentTool } from '~/composables/useCurrentTool';

const { user, logout } = useAuth();
const { setTool, currentTool } = useCurrentTool();

definePageMeta({
  middleware: [
    'auth',
  ],
});
</script>

<template>
  <ErrorBoundary>
    <div>
      <h1>metremate</h1>
      <button @click="setTool('area-tool')">AreaTool</button>
      <button @click="setTool('line-tool')">LineTool</button>
      <LazyAreaTool v-if="currentTool === 'area-tool'" />
      <LazyLineTool v-if="currentTool === 'line-tool'" />
      <div class="canva">
        
      </div>
    </div>
  </ErrorBoundary>
</template>

<style scoped>
  .canva {
    cursor: crosshair;
    width: 100%;
    height: 500px;
    background-color: bisque;
  }
</style>
