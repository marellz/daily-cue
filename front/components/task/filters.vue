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

  <template v-if="weeksDisplayActive">
    <div v-if="!days.length" class="mt-4 py-5">
      <custom-loader class="text-celadon" />
    </div>

    <div
      v-else
      class="bg-tea-green/50 rounded-xl flex items-center justify-between mt-4"
    >
      <div class="flex items-start w-full">
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

            <div class="text-center space-x-1" v-if="day.activity">
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
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";
import { type TaskActivity, type TaskFilter } from "~/types/task";
import useMoment, { weekdaysShort } from "@/composables/useMoment";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-vue-next";
import { type Moment } from "moment";

interface Day {
  date: number;
  month: string;
  isToday: boolean;
  dateString: string;
  activity: TaskActivity | null;
}
const store = useTasksStore();
const moment = useMoment();

const filters = defineModel<TaskFilter>({ default: {} });
const week = ref<number>(moment().week());
const months = computed(() => moment.monthsShort());
const days = ref<Array<Day>>([]);
const firstDay = ref<Moment>(moment().startOf("week"));

const setDays = async () => {
  const startDay = firstDay.value.clone();
  const from = firstDay.value.format("YYYY-MM-DD");
  const to = firstDay.value.clone().add(1, "week").format("YYYY-MM-DD");

  store.setDateRange({
    from,
    to,
  });

  days.value = Array(7)
    .fill({})
    .map((d, index) => {
      let day = startDay.clone().add(index, "days");

      return {
        date: day.date(),
        activity: null,
        isToday: moment().isSame(day, "day"),
        month: months.value[day.month()],
        dateString: day.format("YYYY-MM-DD"),
      };
    });
};

const setActivity = () => {
  days.value = days.value.map((d, i) => {
    const activity = store.weeklyActivity ? store.weeklyActivity[i] : null;
    return {
      ...d,
      activity,
    };
  });
};

const toggleWeek = (forward?: boolean) => {
  week.value = firstDay.value.add(forward ? 1 : -1, "week").week();

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

watch(() => store.weeklyActivity, setActivity);

watch(week, setDays);

watch(
  filters,
  async ({ date, status }, { date: dateBefore }) => {
    let dateString = date ? date : moment().format("YYYY-MM-DD");
    await store.all(dateString, status);

    if (date !== dateBefore) {
      filters.value.status = "default";
    }
  },
  {
    deep: true,
  }
);
</script>
