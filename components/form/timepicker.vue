<template>
  <div class="relative" ref="target">
    <button
      type="button"
      class="!flex items-center space-x-2 form-input"
      @click="active = !active"
    >
      <Clock :size="16" />
      <span>
        {{ selectedTime }}
      </span>
      <div class="!ml-auto">
        <ChevronDown class="transform transition ease-in-out" :class="{'rotate-180':active}" />
      </div>
    </button>
    <div
      class="card bg-white absolute w-full z-[2] top-full mt-2"
      v-show="active"
    >
      <perfect-scrollbar class="h-32">
        <div
          class="flex p-1 rounded-lg"
          v-for="({ value, label,id }, key) in times"
          :key="id"
          :class="{ 'bg-slate-200': value === time }"
        >
          <input
            type="radio"
            name="time-select"
            :id="`time-${id}`"
            class="h-0 w-0"
            :value
            v-model="time"
          />
          <label :for="`time-${id}`" class="block">
            <p>{{ label }}</p>
          </label>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ChevronDown, Clock } from "lucide-vue-next";
import type { TaskDate } from "~/types/task";

const model = defineModel<TaskDate>();
const moment = useMoment();
const target = ref()
const time = ref("8:00");
const active = ref(false);
const times = computed(() => {
  let _m = moment();
  let _s = _m.hours(6).minutes(0);
  let _e = _s.clone().hours(20).minutes(0);
  let _list = [];
  do {
    _list.push({
      id: useId(),
      label: _s.format("hh:mm A"),
      value: _s.format("HH:mm"),
    });
    _s.add("30", "minutes");
  } while (!_s.isAfter(_e, "minute"));
  
  return _list;
});

const selectedTime = computed(() => {
  const _t = times.value.find(t=>t.value===time.value)
  return _t?.label ?? '--:--'
})

watch(time, (v) => {
  let [hours, minutes] = v.split(":");
  model.value = moment(model.value).set({
    hours: Number(hours),
    minutes: Number(minutes),
  });

  active.value = false
});

onMounted(() => {
  // set time from model
  if (model.value) {
    time.value = moment(model.value)
      .add(1, "hour")
      .startOf("hour")
      .format("HH:mm");
  }
});

onClickOutside(target, () => {
  active.value = false
})
</script>
