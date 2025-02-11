<template>
  <div class="card">
    <p class="text-gray-600 mb-2">Current tasks</p>
    <h1 class="text-xl">
      You have {{ current }}
      tasks for today.
      
      <template v-if="urgent">
        {{ urgent }} are
        <span class="text-gray-900 font-bold">urgent</span>
      </template>
    </h1>
    <hr class="my-2" />
    <div class="flex flex-wrap gap-4">
      <custom-loader v-if="loading"></custom-loader>
      <template v-else>
        <span
          v-for="(tag, key) in filteredTags"
          :key
          class="overview-tag"
        >
          {{ tag.name }}
        </span>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>

import _ from "lodash";
import { useTagsStore } from "~/store/tags";
import type { Tag } from "~/types/tag";
defineProps<{
  urgent?: number;
  current: number;
}>();
const filteredTags = ref<Array<Tag>>([]);
const loading = ref(true);
const tagsStore = useTagsStore()
const tags = computed(() => tagsStore.tags)
onMounted(() => {
  filteredTags.value = _.shuffle([...tags.value]).splice(0, 3);
  loading.value = false;
});
</script>
