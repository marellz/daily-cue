<template>
    
  <transition-group
    name="tasks"
    tag="ul"
    class="space-y-3 flex flex-col mt-4 relative"
  >
    <li v-for="task in tasks" :key="task.id">
      <task-item class="max-w-full" :task @show-task="showTaskModal" />
    </li>
    <div
      v-if="!tasks.length"
      class="p-10 flex gap-10 items-center card border-0 mt-10 bg-tea-green/50"
    >
      <img class="h-48" src="@/assets/images/empty.svg" alt="" />
      <div class="mb-10 space-y-2">
        <h1 class="font-semibold text-3xl">No tasks.</h1>
        <p class="text-lg text-slate-500">No created tasks for this day.</p>
      </div>
    </div>
  </transition-group>

  <Teleport to="body">
      <task-view
        v-model:active="taskModalActive"
        v-if="currentTask"
        :id="currentTask"
      />
  </Teleport>
</template>
<script lang="ts" setup>
import type { Task } from "~/store/tasks";
defineProps<{
  tasks: Task[];
}>();

const taskModalActive = ref(false);
const currentTask = ref<string | number | null>();
const showTaskModal = async (id: string) => {
  currentTask.value = id;
  taskModalActive.value = true;
};


</script>
