<template>
  <div
    class="flex items-start rounded-2xl w-72 z-10 relative m-4 mb-0"
    :class="[toastTheme]"
  >
  <div class="p-3">
    <div class="h-10 w-10 flex items-center justify-center rounded-full bg-black/25">
      <component :is="toastIcon" />
    </div>
  </div>
    <div class="flex-auto p-2 mb-1">
      <h1 class="font-bold text-normal">{{ toast.title }}</h1>
      <p class="text-xs mt-1">{{ toast.description }}</p>
    </div>
    <button
      type="button"
      class="p-1 bg-white/25 rounded-full m-2"
      @click="$emit('close', toast.id)"
    >
      <x :size="20" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { Toast, ToastVariant } from "~/store/toasts";
import { Check, CircleAlert, Info, TriangleAlert } from "lucide-vue-next";
import { X } from "lucide-vue-next";
const props = defineProps<{
  toast: Toast;
}>();

defineEmits(["close"]);

const defaultVariant : ToastVariant = "info"

interface Themes {
  success: string;
  info: string;
  error: string;
}

const icons = {
  success: Check,
  info: Info,
  error: CircleAlert,
};

const themes: Themes = {
  success: "bg-sea-green text-white",
  info: "bg-midnight-green text-white",
  error: "bg-vermilion text-white",
};

const toastTheme = computed(() => {
  const v = props.toast.variant || defaultVariant;
  return themes[v as keyof Themes];
});

const toastIcon = computed(() => {
  return icons[props.toast.variant || defaultVariant];
});
</script>
