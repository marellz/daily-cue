<template>
  <layout-container>
    <!-- header -->
    <div
      class="sticky rounded-xl p-4 -mx-4 top-10 pb-10 backdrop-blur-lg z-[2]"
    >
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
          <nuxt-link to="/create/task">
            <button type="button" class="btn btn-primary">
              <Plus :size="20"></Plus>
              <span>Add a new task</span>
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <ul class="flex items-center">
      <li v-for="{ path, label } in links">
        <nuxt-link :to="path" class="text-lg font-medium px-2 text-slate-400" exact-active-class="!text-black">{{ label }}</nuxt-link>
      </li>
      <li>
          <task-filters />
      </li>
    </ul>
    <div class="mt-4 space-y-4">
      <router-view />
    </div>
  </layout-container>
</template>
<script lang="ts" setup>
import { Plus } from "lucide-vue-next";
import { useAuthStore } from "~/store/auth";

const links = [
  {
    path: "/tasks",
    label: "Today",
  },
  {
    path: "/tasks/calendar",
    label: "Calendar",
  },
];

const auth = useAuthStore();
const moment = useMoment();

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
</script>
