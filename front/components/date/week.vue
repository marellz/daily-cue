<template>
  <div>
    <div class="flex items-center space-x-4">
      <button type="button" @click="() => toggleWeek(false)">
        <ArrowLeft :size="20" />
      </button>
      <span> Week {{ week }} </span>
      <button type="button" @click="() => toggleWeek(true)">
        <ArrowRight :size="20" />
      </button>
    </div>
    <template v-if="!days.length">
      <div class="mt-4">
        <custom-loader />
      </div>
    </template>
    <div v-else class="flex items-center justify-between mt-4">
      <div class="flex items-center">
        <div v-for="(day, i) in days" :key="day.dateString" class="p-2">
          <input
            type="radio"
            name="day"
            class="absolute h-0 w-0 invisible"
            v-model="model"
            :id="day.dateString"
            :value="day.dateString"
          />
          <label
            :for="day.dateString"
            class="p-3 flex flex-col bg-slate-100 rounded-lg w-20 text-center border"
            :class="{
              '!bg-blue-500 border-blue-500 !text-white': day.isToday,
              'border-slate-500 text-slate-800': day.dateString === model,
            }"
          >
            <p class="uppercase text-xs tracking-widest opacity-50">
              {{ weekdaysShort[i] }}
            </p>
            <h1 class="text-2xl font-medium">
              {{ day.date }}
            </h1>
            <p class="text-xs">
              {{ day.month }}
            </p>
            <div class="text-center space-x-1">
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-black"></span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import useMoment from "@/composables/useMoment";
import type { Moment } from "moment";

const moment = useMoment();

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

const model = defineModel();

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

  if(week.value !== moment().week()){
    model.value = days.value[0].dateString
  } else{
    model.value = moment().format('YYYY-MM-DD')
  }
};

onMounted(() => {
  model.value = moment().format("YYYY-MM-DD");
  setDays();
});

watch(week, setDays);
</script>
