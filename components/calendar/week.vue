<template>
  <div
    class="bg-tea-green/50 rounded-xl flex items-center justify-between mt-4"
  >
    <div class="flex w-full">
      <div v-for="(day, i) in days" :key="day.dateString" class="flex-auto p-2">
        <input
          type="radio"
          name="day"
          class="absolute h-0 w-0 opacity-0"
          v-model="filters.date"
          :id="day.dateString"
          :value="day.dateString"
        />
        <label
          :for="day.dateString"
          role="button"
          class="p-3 flex flex-col rounded-xl text-center focus:ring focus:ring-celadon hover:ring hover:ring-celadon/25 h-full"
          :class="{
            'ring ring-celadon': day.isToday,
            'bg-celadon': day.dateString === filters.date,
          }"
        >
          <p class="uppercase text-xs tracking-widest opacity-50">
            {{ weekdaysShort[i] }}
          </p>
          <h1 class="text-4xl font-bold">
            {{ day.date }}
          </h1>
          <p class="text-xs opacity-50">
            {{ day.month }}
          </p>

          <!-- <div class="text-center space-x-1" v-if="day.activity">
              <span
                v-if="day.activity.pending"
                class="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"
              ></span>
              <span
                v-if="day.activity.in_progress"
                class="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
              ></span>
              <span
                v-if="day.activity.completed"
                class="inline-block h-1.5 w-1.5 rounded-full bg-green-500"
              ></span>
            </div> -->
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";

const store = useTasksStore();
const filters = computed(() => store.filters);

export interface Day {
  date: number;
  month: string;
  dateString: string;
  isToday: Boolean;
  activity: unknown;
}
defineProps<{
  days: Day[];
}>();
</script>
