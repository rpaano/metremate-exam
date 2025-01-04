import { defineStore } from 'pinia';

export const useMeasurementStore = defineStore('measurement', {
  state: () => ({
    pixelDistance: 0,
    scale: 100, // scale of 1:100
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  }),
  getters: {
    realWorldDistance(state): number {
      if (!state.scale || !state.devicePixelRatio) return 0;
      const adjustedPixels = state.pixelDistance / state.devicePixelRatio;
      return adjustedPixels / state.scale;
    },
  },
  actions: {
    setPixelDistance(distance: number) {
      this.pixelDistance = distance;
    },
    setScale(newScale: number) {
      if (newScale > 0) {
        this.scale = newScale;
      } else {
        // TODO: Change to toaster
        console.warn('Scale must be greater than 0');
      }
    },
  },
});
