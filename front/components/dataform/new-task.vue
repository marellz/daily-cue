<template>
  <custom-modal v-model:show="modalActive" title="Add a new task">
    <form @submit.prevent="submit">
      <div class="space-y-4">
        <form-input label="Task title" v-model="form.title" />
        <form-text label="Task description" v-model="form.description" />
        <form-group label="Due date">
          <form-datepicker
            v-model="selectedDate"
            disable-older
          ></form-datepicker>
        </form-group>

        <div class="flex justify-end">
          <button class="btn btn-primary">
            <circle-plus />
            <span> Add task </span>
          </button>
        </div>
      </div>
    </form>
  </custom-modal>
</template>
<script lang="ts" setup>
import type { Task } from "~/types/task";
import { CirclePlus } from "lucide-vue-next";
import { useTasksStore } from "~/store/tasks";
import { type Moment } from "moment";
import useMoment from "~/composables/useMoment";

const moment = useMoment()
const store = useTasksStore();
const modalActive = ref(false);
const selectedDate = ref<Moment | null>(null);
const newTask: Task = {
  title: "",
  description: "",
  due_date: "",
  status: "default",
};

const form = ref<Task>(newTask);

const launch = () => {
  modalActive.value = true
};

const submit = async () => {
  let task = { ...form.value };
  task.status = "pending";
  if (selectedDate.value) {
    task.due_date = selectedDate.value.format("YYYY-MM-DD");
  } else {
    task.due_date = moment().format("YYYY-MM-DD");
  }

  const added = await store.create(task);

  if(added){
    modalActive.value = false
  }
};

defineExpose({
  launch,
});
</script>
