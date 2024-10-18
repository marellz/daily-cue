<template>
  <layout-container>
    <div>
      <div class="grid grid-cols-2 gap-10">
        <div class="py-20">
          <h1 class="text-[80px] leading-[90px] font-bold">
            <span class="text-gray-700 font-normal tracking-tight"> Good morning, </span>
            Dave!
          </h1>

          <div class="mt-10 max-w-lg space-y-3">
            <stats-overdue />
            <stats-current />
            <stats-progress />
          </div>
        </div>
        <div>
          <div class="flex items-start space-x-10">
            <page-title> My Tasks </page-title>
            <form-datepicker></form-datepicker>
            <nuxt-link to="/new/task">
              <button type="button" class="btn">
                <plus></plus>
                <span>Add a new task</span>
              </button>
            </nuxt-link>
          </div>
          <perfect-scrollbar class="max-h-[50vh] mt-10">
            <ul class="space-y-3 flex flex-col">
              <li v-for="task in tasks">
                <task-item :task />
              </li>
            </ul>
          </perfect-scrollbar>
        </div>
      </div>
    </div>
  </layout-container>
</template>
<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";
import { Plus } from "lucide-vue-next";
const store = useTasksStore();

const tasks = computed(() => store.tasks);
</script>
