<template>
  <layout-container>
    <page-title>Update task</page-title>
    <div class="mt-10" v-if="task">
      <task-form @submit="update" :task />
    </div>
    <div v-else>
        <custom-loader />
    </div>
  </layout-container>
</template>
<script lang="ts" setup>
import { useTasksStore, type Task, type TaskForm } from "~/store/tasks";

const route = useRoute();
const router = useRouter();
const store = useTasksStore();
const id = computed(() => route.params.id as string);
const task = ref<Task | null>();

const update = async (form: TaskForm) => {
  const success = await store.update(id.value, form);

  if (success) {
    router.push("/tasks");
  }
};

onMounted(async () => {
  const _task = await store.getBy("id", id.value);

  if (_task) {
    task.value = _task;
  }
});
</script>
