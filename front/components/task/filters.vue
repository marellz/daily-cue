<template>
  <div>
    <!-- top bar -->
    <div class="flex items-start space-x-4 mt-4">
      <form-status v-model="filters.status"></form-status>
      <div
        class="inline-flex items-center space-x-4 btn"
        :class="{ 'btn-primary': weeksDisplayActive }"
      >
        <button type="button" @click="() => toggleWeek(false)">
          <ArrowLeft :size="20" />
        </button>
        <button
          type="button"
          class="inline-flex items-center space-x-2"
          @click="toggleWeekDisplay"
        >
          <span> Week {{ week }} </span>
          <ChevronDown :class="{ 'opacity-50': !weeksDisplayActive }" />
        </button>
        <button type="button" @click="() => toggleWeek(true)">
          <ArrowRight :size="20" />
        </button>
      </div>
    </div>
  </div>

  <!-- bottom bar -->
  
    <template v-if="weeksDisplayActive">
      <div v-if="!days.length" class="mt-4">
        <custom-loader />
      </div>

      <div v-else class="bg-tea-green/50 rounded-xl flex items-center justify-between mt-4">
        <div class="flex items-center w-full">
          <div
            v-for="(day, i) in days"
            :key="day.dateString"
            class="flex-auto p-2"
          >
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
              class="p-3 flex flex-col rounded-xl text-center focus:ring focus:ring-celadon hover:ring hover:ring-celadon/25"
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
              <div class="text-center space-x-1">
                <span
                  class="inline-block h-1.5 w-1.5 rounded-full bg-black"
                ></span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </template>
</template>
<script lang="ts" setup>
import moment from "moment";
import { useTasksStore } from "~/store/tasks";
import { type TaskStatus } from "~/types/task";

interface TaskFilter {
  status: TaskStatus;
  date: string;
}
const store = useTasksStore();
// weekday component logic
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-vue-next";
import type { Moment } from "moment";

// const moment = useMoment();

interface Day {
  date: number;
  month: string;
  isToday: boolean;
  dateString: string;
}

const weekdaysShort = computed(() => moment.weekdaysShort());
const week = ref<number>(moment().week());
const months = computed(() => moment.monthsShort());
const days = ref<Array<Day>>([]);
const firstDay = ref<Moment>(moment().startOf("week"));

const setDays = () => {
  const startDay = firstDay.value.clone();
  days.value = Array(7)
    .fill({})
    .map(() => {
      let day = startDay.add(1, "days");

      return {
        date: day.date(),
        isToday: moment().isSame(day, "day"),
        month: months.value[day.month()],
        dateString: day.format("YYYY-MM-DD"),
      };
    });
};

// const model = defineModel();

const toggleWeek = (forward?: boolean) => {
  if (forward) {
    if (week.value === 52) {
      week.value = 1;
    } else {
      week.value++;
    }
  } else {
    if (week.value === 1) {
      week.value = 52;
    } else {
      week.value--;
    }
  }

  firstDay.value = moment().week(week.value).startOf("week");

  if (week.value !== moment().week()) {
    filters.value.date = days.value[0].dateString;
  } else {
    filters.value.date = moment().format("YYYY-MM-DD");
  }
};
const weeksDisplayActive = ref(false);
const toggleWeekDisplay = () => {
  weeksDisplayActive.value = !weeksDisplayActive.value;
};

onMounted(() => {
  filters.value.date = moment().format("YYYY-MM-DD");
  setDays();
});

watch(week, setDays);

/// filters in general
const filters = defineModel<TaskFilter>({ default: {} });

watch(
  () => filters.value.date,
  () => {
    filters.value.status = "default";
  }
);

watch(
  () => filters.value,
  async ({ date, status }) => {
    let dateString = date ? date : moment().format("YYYY-MM-DD");
    await store.all(dateString, status);
  },
  {
    deep: true,
  }
);
</script>
