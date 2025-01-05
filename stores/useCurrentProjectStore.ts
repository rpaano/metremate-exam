import { defineStore } from 'pinia';
import { debounce } from 'lodash';

export interface CurrentProject {
  name: string;
}

export const useCurrentProjectStore = defineStore('currentProject', {
  state: () => ({
    currentProject: null as CurrentProject | null,
  }),

  getters: {
    currentProjectName: (state) => state.currentProject?.name,
  },

  actions: {
    setCurrentProject(project: CurrentProject) {
      this.currentProject = project;
    },

    updateProjectName: debounce(function (this: any, projectName: string) {
      if (this.currentProject) {
        this.currentProject.name = projectName;
      }
    }, 300),
  },
});
