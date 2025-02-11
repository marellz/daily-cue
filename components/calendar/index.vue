<template>
  <calendar-toggle
    :week
    @last="last"
    @next="next"
    :active="weeksDisplayActive"
    @toggle-active="toggleWeekDisplay"
  ></calendar-toggle>
  <calendar-week :days v-if="weeksDisplayActive"></calendar-week>
</template>
<script lang="ts" setup>
import type { Moment } from "moment";
import { useTasksStore, type TaskFilter } from "~/store/tasks";
import type { Day } from "./week.vue";
const store = useTasksStore();
const moment = useMoment();
const filters = ref<TaskFilter>({ ...store.filters });
const updateFilters = () => store.updateFilters(filters.value);

watch(filters, (v) => {
  updateFilters();
});

const week = ref<number>(moment().week());
const months = computed(() => moment.monthsShort());
const firstDay = ref<Moment>(moment().startOf("week"));

const toggleWeek = (forward?: boolean) => {
  week.value = firstDay.value.add(forward ? 1 : -1, "week").week();

  firstDay.value = moment().week(week.value).startOf("week");

  if (week.value !== moment().week()) {
    filters.value.date = days.value[0].dateString;
  } else {
    filters.value.date = moment().format("YYYY-MM-DD");
  }
};

const last = () => toggleWeek(false);
const next = () => toggleWeek(false);

const weeksDisplayActive = ref(true);

const toggleWeekDisplay = () => {
  weeksDisplayActive.value = !weeksDisplayActive.value;
};

// const setActivity = () => {
//   days.value = days.value.map((d, i) => {
//     const activity = store.weeklyActivity ? store.weeklyActivity[i] : null;
//     return {
//       ...d,
//       activity,
//     };
//   });
// };


const days = ref<Array<Day>>([]);
const setDays = async () => {
  const startDay = firstDay.value.clone();
  // const from = firstDay.value.format("YYYY-MM-DD");
  // const to = firstDay.value.clone().add(1, "week").format("YYYY-MM-DD");

  // store.setDateRange({
  //   from,
  //   to,
  // });

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

watch(week, setDays);

onMounted(() => {
  setDays();
});
</script>
