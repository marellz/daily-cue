<template>
  <transition-group
    tag="ul"
    name="toasts"
    class="fixed z-20 h-1 top-0 left-0 w-full flex flex-col items-end space-y-4"
  >
    <toast-item
      :toast
      :key="toast.id"
      v-for="toast in toasts"
      @close="toastStore.remove(toast.id)"
    />
  </transition-group>
</template>
<script lang="ts" setup>
import { useToastsStore } from "~/store/toasts";

const toastStore = useToastsStore();
const toasts = computed(() => toastStore.toasts);
</script>
<style lang="scss">
.toasts {
  &-enter-to,
  &-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  &-leave-to {
    transform: translateX(50%) rotateY(.2turn);
  }

  &-leave-active,
  &-enter-active {
    transition: all 0.5s ease;
  }

  &-enter-active {
  }

  &-move {
    transition-delay: 0.25s;
    position: absolute;
  }

  &-leave-active {
    // position: absolute;
  }
}
</style>
