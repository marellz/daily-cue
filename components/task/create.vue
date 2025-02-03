<template>
  <custom-modal v-model:show="modalActive" title="Add a new task">
    <task-form @submit.prevent="submit" v-model="form">
      <task-form @submit="submit" />
      <div class="flex justify-end">
        <button class="btn btn-primary">
          <circle-plus />
          <span> Add task </span>
        </button>
      </div>
    </task-form>
    <div class="flex items-center space-x-2 justify-end mt-4">
      <base-button @click="modalActive = false">
        <span>Cancel</span></base-button
      >
      <base-button class="btn-primary" @click="submit">
        <Check />
        <span>Create task</span>
      </base-button>
    </div>
  </custom-modal>
</template>
<script lang="ts" setup>
import type { TaskForm } from "~/types/task";
import { useTasksStore } from "~/store/tasks";
import useMoment from "~/composables/useMoment";
import { newTask } from "~/data/tasks";
import { Check, CirclePlus } from "lucide-vue-next";

const moment = useMoment();
const store = useTasksStore();
const modalActive = ref(false);

const launch = () => {
  modalActive.value = true;
};

const form = ref<TaskForm>(newTask);

const submit = async () => {
  let task = { ...form.value };
  task.status = "pending";
  let due_date;
  if (form.value.due_date) {
    due_date = moment(form.value.due_date).format("YYYY-MM-DD");
  } else {
    due_date = moment().format("YYYY-MM-DD");
  }

  const added = await store.create({ ...form.value, due_date });

  if (added) {
    modalActive.value = false;
  }
};

defineExpose({
  launch,
});
</script>
