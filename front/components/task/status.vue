<template>
  <span class="py-1 px-2 border border-current rounded-full text-medium text-sm" :class="[variant]">
    {{ status }}
  </span>
</template>
<script lang="ts" setup>
import { type TaskStatus } from "@/types/task";
enum StatusEnum {
  completed = 'bg-green-100 text-green-500',
  in_progress = 'bg-blue-100 text-blue-500',
  pending = 'bg-amber-100 text-amber-500',
  overdue = 'bg-red-100 text-red-500',
}
const props = defineProps<{
  status: TaskStatus;
}>();

const variant = computed(() => StatusEnum[props.status])
</script>
