<template>
  <div class="card">
    <p class="text-gray-600 mb-2">Overdue tasks</p>
    <h1 class="text-xl font-medium">
      You have {{ count }} <span class="text-gray-900">unfinished</span> tasks.
    </h1>
    <hr class="my-2" />
    <div class="flex flex-wrap gap-4">
      <span
        v-for="tag in tags"
        :key="tag._id"
        class="overview-tag"
        >{{ tag.name }}</span
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTagsStore } from '~/store/tags';

defineProps<{
  count: number;
}>()

const tagsStore = useTagsStore()
const tags = computed(() => tagsStore.tags)
// todo: tags from remaining tasks
</script>
