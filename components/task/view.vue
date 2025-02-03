<template>
  <custom-modal title="Task view" v-model:show="active">
    <div class="space-y-4">
      <template v-if="form">
        <template v-if="!editMode">

          <!-- todo: this should accept form -->
          <task-status v-if="task" @update-status="refresh" :task />

          <div class="border rounded-lg p-2 mt-4 space-y-3">
            <div class="flex items-center justify-between">
              <p class="text-sm text-slate-500">Task details</p>
              <button type="button"
                class="inline-flex items-center space-x-2 p-2 rounded-full bg-slate-200 hover:bg-black hover:text-white"
                @click="editMode = true">
                <span class="">
                  <EditIcon :size="20" :stroke-width="1.5" />
                </span>
                <span>Edit task</span>
              </button>
            </div>
            <h1 class="text-2xl">{{ form.title }}</h1>
            <p class="inline-flex items-center space-x-2 py-1 px-3 text-sm rounded-full bg-slate-200">
              <Calendar :opacity="0.4" :size="16" />
              <span>{{ taskDueDate.date }} &ndash; {{ taskDueDate.time }}</span>
            </p>
            <p>{{ form.description }}</p>
          </div>
        </template>
        <div v-else="form">
          <task-form :submitted v-model="form" />
        </div>
      </template>
      <div v-else class="p-20">
        <custom-loader />
      </div>
      <div class="flex space-x-3 bg-tea-green/25 p-3 rounded-xl">
        <template v-if="editMode">
          <base-button class="btn-primary" @click="update">
            <Check />
            <span>Save changes</span>
          </base-button>
          <base-button @click="editMode = false">
            <span>Cancel</span>
          </base-button>
        </template>
        <template v-else>
          <base-button @click="active = false">
            <span>Close</span>
          </base-button>
        </template>
      </div>
    </div>
  </custom-modal>
</template>
<script lang="ts" setup>
import { Calendar, EditIcon, Check } from "lucide-vue-next";
import useMoment from "~/composables/useMoment";
import { useTasksStore } from "~/store/tasks";
import { type TaskForm, type Task } from "~/types/task";

const moment = useMoment();
const store = useTasksStore();
const props = defineProps<{
  id: string | number;
}>();

const active = defineModel("active", { default: false });
const editMode = ref(false);
const submitted = ref(false);

// task being edited, readonly
const task = ref<Task | null>()

// task, but editable
const form = ref<TaskForm | undefined>();
const taskDueDate = computed(() => {
  if (!form.value) {
    return { date: "", time: "" };
  }

  const _d = moment(form.value.due_date);
  let dateFormat = "Do MMM";
  if (_d.year() !== moment().year()) {
    dateFormat += " YYYY";
  }
  let date = _d.format(dateFormat);
  let time = _d.format("hh:mm A");

  return { date, time };
});

const update = async (_form: TaskForm) => {
  if (!form.value) {
    return;
  }

  const updated = await store.update(props.id, form.value);

  if (updated) {
    editMode.value = false;
  }
};

const refresh = async () => {
  const _t = await store.get(props.id);

  if (_t) {
    task.value = _t
    const { title, description = '', due_date, status, tags = [] } = _t;
    let tag_ids = tags.map(t => t._id)
    form.value = { title, description, due_date, status, tags: tag_ids };
  }
};

watch(active, () => {
  editMode.value = false;
});

watch(() => props.id, refresh);

onMounted(refresh);
</script>
