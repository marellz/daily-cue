<template>
  <div ref="datepicker">
    <button
      type="button"
      class="form-input !inline-flex items-center space-x-3"
      @click="active = !active"
    >
      <Calendar :size="16" />
      <span>{{
        selectedDate.isSame(today, "day") ? "Today" : formatDate(selectedDate)
      }}</span>
    </button>
    <div v-show="active" class="card bg-white mt-2 absolute z-10">
      <div class="border rounded-lg p-4 flex">
        <button type="button" @click="monthOnDisplay--">
          <ArrowLeft></ArrowLeft>
        </button>
        <span class="px-4 flex-auto text-center"
          >{{ monthOnDisplayFull
          }}<span v-if="yearOnDisplay === currentYear"
            >/{{ yearOnDisplay }}</span
          >
        </span>
        <button type="button" @click="monthOnDisplay++">
          <ArrowRight></ArrowRight>
        </button>
      </div>
      <table class="mt-4">
        <thead>
          <tr>
            <th v-for="d in weekDays" :key="d">
              <span class="block w-10 h-10">
                {{ d }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar">
            <td v-for="day in week.days">
              <button
                type="button"
                class="border w-10 h-10 rounded-lg bg-transparent text-black disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300"
                :class="{
                  '!bg-black !text-white': today.isSame(day, 'date'),
                  '!bg-celadon': day.isSame(selectedDate, 'day'),
                }"
                :disabled="disableOlder && day.isBefore(today, 'day')"
                @click="selectDate(day)"
              >
                {{ day.date() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeft, ArrowRight, Calendar } from "lucide-vue-next";
import { type Moment } from "moment";
import useMoment from "~/composables/useMoment";
import { onClickOutside } from "@vueuse/core";
import type { TaskDate } from "~/types/task";

withDefaults(
  defineProps<{
    disableOlder?: boolean;
  }>(),
  {
    disableOlder: false,
  }
);

const moment = useMoment();

const datepicker = ref();
const weekDays = computed(() => "SMTWTFS".split(""));
const model = defineModel<TaskDate>({ default: new Date() });

// starting point
const today = moment();

const todayDateString = computed(() => today.format("YYYY-MM-DD"));
const months = moment.months();
const currentMonth = computed(() => moment.months()[moment().month()]);
const currentYear = ref(moment().year());
const monthOnDisplay = ref(moment().month());
const monthOnDisplayFull = computed(() => months[monthOnDisplay.value]);
const yearOnDisplay = ref(currentYear);

// build calendar
const calendar = ref<Array<{ days: Array<Moment> }>>([]);

const buildCalendar = (month: string = currentMonth.value) => {
  const todayThatMonth = moment()
    .month(monthOnDisplay.value)
    .date(today.date());
  calendar.value = [];
  const startDay = todayThatMonth.clone().startOf("month").startOf("week");
  const endDay = todayThatMonth.clone().endOf("month").endOf("week");
  const date = startDay.clone().subtract(1, "day");
  while (date.isBefore(endDay, "day")) {
    calendar.value.push({
      days: Array(7)
        .fill(0)
        .map(() => date.add(1, "day").clone()),
    });
  }
};

// dialog
const active = ref(false);

const selectedDate = ref<Moment>(moment(model.value) ?? moment());

const selectDate = (date: Moment) => {
  selectedDate.value = date;
  model.value = date.toDate();
  active.value = false;
};

const formatDate = (date: Moment) => moment(date).format("Do MMM YYYY");

onMounted(buildCalendar);

onMounted(() => {
  if (!model.value) {
    model.value = moment().toDate();
  }
});

watch(
  () => monthOnDisplay.value,
  () => buildCalendar()
);

watch(monthOnDisplay, (v) => {
  if (v < 0) {
    monthOnDisplay.value = 11;
    yearOnDisplay.value--;
  } else if (v > 11) {
    monthOnDisplay.value = 0;
    yearOnDisplay.value++;
  }
});

onClickOutside(datepicker, () => {
  active.value = false;
});
</script>
