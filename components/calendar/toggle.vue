<template>
  <div
    class="inline-flex items-center space-x-4 btn"
    :class="{ 'btn-primary': active }"
  >
    <button type="button" @click="$emit('last')">
      <ArrowLeft :size="20" />
    </button>
    <button
      type="button"
      class="inline-flex items-center space-x-2"
      @click="$emit('toggle-active')"
    >
      <span> Week {{ week }} </span>
      <ChevronDown :class="{ 'opacity-50': !active }" />
    </button>
    <button type="button" @click="$emit('next')">
      <ArrowRight :size="20" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-vue-next";

defineEmits(["toggle-active", "next", "last"]);
defineProps<{
  week: number | string;
  active?: boolean;
}>();
</script>
