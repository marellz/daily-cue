<template>
  <custom-modal title="Task view" v-model:show="active">
    <div class="space-y-4">
      <template v-if="task">
        <div class="flex items-center justify-end space-x-2">
          <nuxt-link :to="`/edit/task/${task.id}`">
            <base-action-button class="action-btn">
              <Trash2 :size="20" :stroke-width="1.5" />
              <span>Update</span>
            </base-action-button>
          </nuxt-link>
          <base-action-button @click="deleteTask">
            <Trash2 />
            <span>Delete</span>
          </base-action-button>
        </div>
        <div class="border rounded-lg p-2 mt-4 space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-sm text-slate-500">Task details</p>
          </div>
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl">{{ task.title }}</h1>
            <task-status v-if="task" @update-status="refresh" :task />
          </div>
          <p
            class="inline-flex items-center space-x-2 py-1 px-3 text-sm rounded-full bg-slate-200"
          >
            <Calendar :opacity="0.4" :size="16" />
            <span>{{ taskDueDate.date }} &ndash; {{ taskDueDate.time }}</span>
          </p>
          <p>{{ task.description }}</p>
        </div>
      </template>
      <div v-else class="p-20">
        <custom-loader />
      </div>
    </div>
  </custom-modal>
</template>
<script lang="ts" setup>
import { Calendar, EditIcon, Check, Trash2 } from "lucide-vue-next";
import useMoment from "~/composables/useMoment";
import { useTasksStore, type Task, type TaskForm } from "~/store/tasks";

const moment = useMoment();
const store = useTasksStore();
const props = defineProps<{
  id: string | number;
}>();

const active = defineModel("active", { default: false });

const task = ref<Task | null>();
const taskDueDate = computed(() => {
  if (!task.value) {
    return { date: "", time: "" };
  }

  const _d = moment(task.value.due_date);
  let dateFormat = "Do MMM";
  if (_d.year() !== moment().year()) {
    dateFormat += " YYYY";
  }
  let date = _d.format(dateFormat);
  let time = _d.format("hh:mm A");

  return { date, time };
});

const refresh = async () => {
  const _t = await store.getBy("id", props.id.toString());

  if (!_t) {
    return;
  }

  task.value = _t;
};

const deleteTask = async () => {
  const success = await store.destroy(props.id as string)
  if(success){
    active.value = false
  }
}

watch(() => props.id, refresh);

onMounted(refresh);
</script>
