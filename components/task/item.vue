<template>
  <div
    class="border rounded-xl p-4 flex transition duration-100"
    :class="statusBackground[task.status as TaskStatus]"
  >
    <div class="flex-auto">
      <div class="flex items-center justify-between space-x-3">
        <task-status :task />
        <div class="flex">
          <button
            type="button"
            class="p-2 bg-black text-white rounded-full shadown-lg hover:shadow-md hover:shadow-black/20"
            @click="show"
          >
            <SquareArrowOutUpRight />
          </button>
        </div>
      </div>
      <div class="">
        <h1 class="text-xl font-medium">
          {{ task.title }}
        </h1>
      </div>
      <p class="text-gray-600">
        {{ task.description }}
      </p>
      <template v-if="task.tags?.length">
        <ul class="mt-4 flex flex-wrap gap-4">
          <li v-for="item in task.tags">
            <p class="rounded-full px-2 py-0.5 text-xs leading-normal" :class="TagColors[item]">
              {{ item }}
            </p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type TaskStatus } from "@/types/task";
import { SquareArrowOutUpRight } from "lucide-vue-next";
import type { Task } from "~/store/tasks";
import { TagColors } from "~/types/tag";

const props = defineProps<{
  task: Task
}>();

const emit = defineEmits(["show-task"]);

const show = () => {
  emit("show-task", props.task.id);
};

type StatusBackground = Record<TaskStatus, string>

const statusBackground: StatusBackground = {
  pending: "bg-amber-100 border-amber-500",
  in_progress: "bg-blue-100 border-blue-500",
  completed: "bg-green-100 border-green-500",
};
</script>
