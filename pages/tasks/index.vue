<template>
  <layout-container>
    <div>
      <!-- header -->
      <div class="sticky rounded-xl p-4 -mx-4 top-10 pb-10 backdrop-blur-lg z-[2]">
        <div class="flex items-center justify-between space-x-4">
          <div class="flex-auto animate-home">
            <client-only>
              <h1 class="text-2xl font-bold text-sea-green">
                Good {{ dayTime }}, {{ user }}!
              </h1>
              <p>What do you feel like adding today?</p>
            </client-only>
          </div>
          <div class="flex items-center space-x-3">
            <nuxt-link to="/tasks/create">
              <button type="button" class="btn btn-primary">
                <plus :size="20"></plus>
                <span>Add a new task</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="mt-4">
          <task-filters v-model="filters" />
        </div>
      </div>

      <div v-if="currentDay" class="bg-tea-green/25 px-3 py-4 rounded-xl">
        <h1 class="text-xl font-medium">Your tasks for {{currentDay}}</h1>
        <!-- todo: wrap in transition -->
        <!-- <p v-if="todaysActivity && todaysActivity.total" class="text-slate-400">
          <span v-if="todaysActivity.remaining">{{ todaysActivity.remaining }} more to go!</span>
          <span v-else>All caught up, keep it up!</span>
        </p> -->
        <!-- <p v-else class="text-slate-400">You have no tasks for this day.</p> -->
      </div>

      <transition-group name="tasks" tag="ul" class="space-y-3 flex flex-col mt-4 relative">
        <li v-for="task in tasks" :key="task.id">
          <task-item class="max-w-full" :task @show-task="showTaskModal" />
        </li>
        <div v-if="!tasks.length" class="p-10 flex gap-10 items-center card border-0 mt-10 bg-tea-green/50">
          <img class="h-48" src="@/assets/images/empty.svg" alt="" />
          <div class="mb-10 space-y-2">
            <h1 class="font-semibold text-3xl">No tasks.</h1>
            <p class="text-lg text-slate-500">No created tasks for this day.</p>
          </div>
        </div>
      </transition-group>
    </div>
  </layout-container>
  <task-view v-model:active="taskModalActive" v-if="currentTask" :id="currentTask" />
</template>

<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";
import { Plus } from "lucide-vue-next";
import type { TaskFilter } from "~/types/task";
import { useAuthStore } from "~/store/auth";
import useMoment from "~/composables/useMoment";

definePageMeta({
  middleware: "auth",
});

const moment = useMoment();
const store = useTasksStore();
const auth = useAuthStore();
const filters = ref<TaskFilter>({
  status: "default",
  date: null,
  tags: []
});

const tasks = computed(() => store.tasks);

const currentDay = computed(() => {
  let _c = filters.value.date
  if(!_c){
    return null
  }
  if(moment(_c).isSame(moment(),'day')) return 'today'

  return moment(_c).format('Do MMM')
})

const user = computed(() =>
  auth.user?.name ? auth.user.name.split(" ")[0] : "Unknown"
);

const dayTime = computed(() => {
  let h = moment().hours();
  let t;
  switch (true) {
    case h >= 6 && h < 12:
      t = "morning";
      break;

    case h >= 12 && h < 17:
      t = "afternoon";
      break;

    case h >= 17 && h < 21:
      t = "evening";
      break;

    case h >= 21:
      t = "night";
      break;

    default:
      t = "time";
      break;
  }

  return t;
});

const taskModalActive = ref(false);
const currentTask = ref<string | number | null>();
const showTaskModal = async (id: string) => {
  currentTask.value = id;
  taskModalActive.value = true;
};

onMounted(async () => {
  /**already happending in filters.vue */
  // await store.get(store.today, "default");
});

</script>