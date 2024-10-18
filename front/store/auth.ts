import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthStore = defineStore("auth", () => {}, {
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
