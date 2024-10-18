<template>
  <div ref="datepicker">
    <button type="button" class="btn" @click="active = !active">
      <span>Today</span>
      <ArrowDown />
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
                class="border w-10 h-10 rounded-lg"
                :class="{
                  'bg-black text-white': today.isSame(day, 'date'),
                  'bg-celadon': day.isSame(selectedDate, 'day'),
                }"
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
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-vue-next";
import moment, { type Moment } from "moment";
import { onClickOutside } from "@vueuse/core";

const datepicker = ref();
const weekDays = computed(() => "SMTWTFS".split(""));

// get today
const today = moment();

const months = moment.months();
const currentMonth = computed(() => months[moment().month()]);
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

const selectedDate = ref<Moment | null>();
const selectDate = (date: Moment) => {
  selectedDate.value = date;
};

onMounted(() => {
  buildCalendar();
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
