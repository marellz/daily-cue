<template>
  <div
    class="bg-red-100 items-center text-red-500 flex space-x-3 rounded-lg px-3"
  >
    <AlertCircle />
    <p class="flex-auto p-3">
      <slot />
    </p>
    <button type="button" class="p-3" @click="$emit('dismiss')">
      <XIcon />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { AlertCircle, XIcon } from "lucide-vue-next";
defineEmits(['dismiss'])
</script>
