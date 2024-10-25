<template>
  <div class="flex border rounded w-72 bg-white z-10 relative">
    <div class="flex-auto p-2">
      <h1 class="font-medium">{{ toast.title }}</h1>
      <p class="text-xs">{{ toast.description }}</p>
    </div>
    <button type="button" class="p-2" @click="$emit('close', toast.id)">
      <x :size="20" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { Toast } from "~/store/toasts";
import { X } from "lucide-vue-next";
defineProps<{
  toast: Toast;
}>();

defineEmits(["close"]);
</script>
