<template>
  <div
    class="border rounded-xl p-4 flex"
    :class="statusBackground[task.status as TaskStatus]"
  >
    <div class="flex-auto">
      <div class="flex items-center justify-between space-x-3">
        <task-status :task />
        <div class="flex">
          <button
            type="button"
            class="border border-black hover:bg-black hover:text-white rounded-full p-2"
            @click="show"
          >
            <Ellipsis />
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
    </div>
  </div>
</template>
<script lang="ts" setup>
// TODO: review design
import type { Task, TaskStatus } from "@/types/task";
import { Ellipsis } from "lucide-vue-next";
import { useTasksStore } from "~/store/tasks";
const store = useTasksStore();
const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits(["show-task"]);
// const isComplete = computed(() => props.task.status === "completed");

// const markAsComplete = async () => {
//   if (props.task._id) {
//     await store.update(props.task._id, {
//       ...props.task,
//       completed: true,
//       status: "completed",
//     });
//   }
// };

const show = () => {
  emit("show-task", props.task._id);
};

type StatusBackground = {
  [key in TaskStatus]: string;
}

const statusBackground: StatusBackground = {
  pending: "bg-amber-100 border-amber-500",
  in_progress: "bg-blue-100 border-blue-500",
  completed: "bg-green-100 border-green-500",
};
</script>
