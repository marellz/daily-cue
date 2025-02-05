<template>
    <layout-container>
        <page-title>Add new task</page-title>
        <task-form @submit="submit" />
    </layout-container>
</template>
<script lang="ts" setup>
import { useTasksStore, type TaskForm } from "~/store/tasks";
import useMoment from "~/composables/useMoment";

type NewTask = Omit<TaskForm, "user_id">;
const newTask = {
  tags: [],
  status: "pending",
  title: "",
  due_date: "",
};

const moment = useMoment();
const store = useTasksStore();
const modalActive = ref(false);

const launch = () => {
  modalActive.value = true;
};

const form = ref<NewTask>(newTask);

const submit = async () => {
  let task: NewTask & { due_date: string } = { ...form.value };
  task.status = "pending";
  task.due_date = moment().format("YYYY-MM-DD");

  const success = await store.create(task);

  if (success) {
    modalActive.value = false;
  }
};

defineExpose({
  launch,
});
</script>
