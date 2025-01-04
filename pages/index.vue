<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useCurrentTool } from '~/composables/useCurrentTool';
import { useCurrentProjectStore } from '@/stores/useCurrentProjectStore';

const projectStore = useCurrentProjectStore();
const { user, logout } = useAuth();
const { setTool, currentTool } = useCurrentTool();
const projectName = ref(null);

const area = (data) => {}

const onInput = (event) => {
  projectStore.updateProjectName(event.target.innerText);
}

definePageMeta({
  middleware: [
    'auth',
  ],
});
</script>

<template>
  <ErrorBoundary>
    <div>
      <div>
        <h1 
          @input="onInput"
          contenteditable="true"
          :text-content="projectStore.currentProjectName"
          class="editable-heading"
        >
          {{ projectStore.currentProjectName || "Unnamed Project" }}
        </h1>
        {{ projectStore.currentProjectName }}
        <button @click="() => projectStore.setCurrentProject({ name: 'MetreMate Project' })">
          Initialize Project
        </button>
      </div>
      <div>
        <button @click="setTool('area-tool')">AreaTool</button>
        <button @click="setTool('line-tool')">LineTool</button>
        <LazyAreaTool v-if="currentTool === 'area-tool'" title="Area Tool" @on-toggle="area" />
        <LazyLineTool v-if="currentTool === 'line-tool'" title="Line Tool" @on-toggle="area" />
        <div class="canva"></div>
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
  h1 {
    width: fit-content;
  }
</style>
