<template>
  <div
    class="border select-none rounded-full px-3 py-1"
    :class="TagColors[item.color]"
  >
    <span>
      {{ item.name }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { type Tag, TagColors } from "~/types/tag";

defineProps<{
  item: Tag;
}>();
</script>
