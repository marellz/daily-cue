export const useTasksStore = defineStore("tasks", () => {}, {
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
