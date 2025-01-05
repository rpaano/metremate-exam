<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Konva from 'konva';

interface Point {
  x: number;
  y: number;
}

let currentState = ref<'Idle' | 'Drawing' | 'Finalized'>('Idle');
let startPoint = ref<Point | null>(null);
let measurementLine = ref<Konva.Line | null>(null);
let layer = ref<Konva.Layer | null>(null);
let stage = ref<Konva.Stage | null>(null);

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (container.value) {
    stage.value = new Konva.Stage({
      container: container.value,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    layer.value = new Konva.Layer();
    stage.value.add(layer.value);
  }
});

cosnt startDrawing = (): void => {
  if (currentState.value === 'Idle') {
    currentState.value = 'Drawing';
    enterDrawingState();
  }
}

cosnt enterDrawingState = (): void => {
  if (stage.value && layer.value) {
    stage.value.on('mousedown', (e) => {
      if (!startPoint.value) {
        startPoint.value = stage.value.getPointerPosition() as Point;
        measurementLine.value = new Konva.Line({
          points: [startPoint.value.x, startPoint.value.y, startPoint.value.x, startPoint.value.y],
          stroke: 'blue',
          strokeWidth: 2,
          dash: [10, 5],
        });
        layer.value.add(measurementLine.value);
      } else {
        const endPoint = stage.value.getPointerPosition() as Point;
        measurementLine.value.points([startPoint.value.x, startPoint.value.y, endPoint.x, endPoint.y]);
        layer.value.batchDraw();
      }
    });

    stage.value.on('mousemove', () => {
      if (startPoint.value) {
        const endPoint = stage.value.getPointerPosition() as Point;
        measurementLine.value.points([startPoint.value.x, startPoint.value.y, endPoint.x, endPoint.y]);
        layer.value.batchDraw();
      }
    });
  }
}

cosnt finalizeMeasuremen =>(): void => {
  if (currentState.value === 'Drawing' && measurementLine.value) {
    currentState.value = 'Finalized';
    measurementLine.value.stroke('green');
    measurementLine.value.dash([]);
    layer.value?.batchDraw();

    // Calculate and save the distance here
    const distance = calculateDistance(measurementLine.value);
    saveMeasurement(distance);
  }
}

cosnt calculateDistance = (line: Konva.Line): number => {
  const [x1, y1, x2, y2] = line.points();
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

const saveMeasurement = (distance: number): void => {
  $fetch('/api/save-measurement', {
    method: 'POST',
    body: { distance },
  })
    .then(response => {
      // TODO: change to toaster
      console.log('Measurement saved', response);
    })
    .catch(error => {
      // TODO: change to toaster
      console.error('Error saving measurement:', error);
    });
}
</script>

<template>
  <div>
    <div ref="container" id="canvas-container" class="canvas-container"></div>
    <button @click="startDrawing" v-if="currentState === 'Idle'">Start Drawing</button>
    <button @click="finalizeMeasurement" v-if="currentState === 'Drawing'">Finalize</button>
  </div>
</template>

<style scoped>
.canvas-container {
  position: relative;
  height: 100vh;
}
</style>
