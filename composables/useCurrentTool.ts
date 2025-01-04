export const useCurrentTool = () => {
  const currentTool = ref<CurrentTool | null>();

  const setTool = (tool: CurrentTool) => {
    currentTool.value = tool;
    return currentTool.value;
  };

  return {
    setTool,
    currentTool,
  };
};
