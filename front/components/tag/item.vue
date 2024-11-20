<template>
  <div
    class="border select-none rounded-full px-4 py-1 text-sm flex items-center space-x-2 ring-2 ring-offset-2 ring-transparent"
    :class="[TagColors[item.color], { '!ring-slate-400 !px-3': checked }]">
    <span class="leading-normal">
      {{ item.name }}
    </span>

    <transition name="status">
      <Check :size="16" v-if="checked" />
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { type Tag, TagColors } from "~/types/tag";
import { Check } from 'lucide-vue-next'
defineProps<{
  item: Tag;
  checked?: boolean;
}>();
</script>
