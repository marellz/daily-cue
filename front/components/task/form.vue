<template>
  <div class="space-y-4">
    <form-input label="Task title" v-model="form.title" />
    <form-text label="Task description" :rows="6" v-model="form.description" />
    <div class="grid grid-cols-2 gap-4">
      <form-select label="Task status" v-model="form.status">
        <option
          v-for="option in status"
          :value="option.name"
          :key="option.name"
        >
          {{ option.label }}
        </option>
      </form-select>
      <form-group v-if="form.status!=='completed'" label="Due date">
        <div class="space-y-2">
          <form-datepicker v-model="form.due_date" disable-older />
          <form-timepicker v-model="form.due_date" />
        </div>
      </form-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Moment } from "moment";
import { type TaskForm } from "~/types/task";
import { newTask, status } from "~/data/tasks";

const emit = defineEmits(["submit"]);

const props = defineProps<{
  task?: TaskForm;
}>();

const selectedDate = ref<Moment | null>(null);

const form = defineModel<TaskForm>({ default: newTask });

watch(selectedDate, (v: Moment | null) => {
  if (v) {
    form.value.due_date = v.toDate();
  }
});

onMounted(() => {
  if (props.task) {
    form.value = props.task;
  }
});
</script>
