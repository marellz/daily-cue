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
const router = useRouter()

const submit = async (_task: TaskForm) => {
  let task: NewTask & { due_date: string } = { ..._task };
  task.status = "pending";
  task.due_date = moment().format("YYYY-MM-DD");

  const success = await store.create(task);

  if (success) {
    router.push('/tasks')
  }
};
</script>
