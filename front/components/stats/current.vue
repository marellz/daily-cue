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
          v-for="{ id, name } in filteredTags"
          :key="id"
          class="overview-tag"
        >
          {{ name }}
        </span>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { tags } from "~/data/tasks";
import _ from "lodash";
import type { Tag } from "~/types/task";
defineProps<{
  urgent?: number;
  current: number;
}>();
const filteredTags = ref<Array<Tag>>([]);
const loading = ref(true);
onMounted(() => {
  filteredTags.value = _.shuffle(tags).splice(0, 3);
  loading.value = false;
});
</script>
