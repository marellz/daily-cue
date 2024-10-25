<template>
  <div
    class="fixed z-20 top-0 left-0 w-full flex flex-col items-end space-y-4 p-4"
  >
    <toast-item
      :toast
      :key="toast.id"
      v-for="toast in toasts"
      @close="toastStore.removeToast(toast.id)"
    />
  </div>
</template>
<script lang="ts" setup>
import { useToastsStore } from "~/store/toasts";

const toastStore = useToastsStore();
const toasts = computed(() => toastStore.toasts);

</script>
