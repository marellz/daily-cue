<template>
  <div class="flex items-center">
    <nuxt-link
      to="/"
      class="inline-flex items-center pr-4 space-x-3 hover:bg-slate-100 rounded-full"
    >
      <span class="bg-slate-100 p-2 rounded-full">
        <Home :size="16" />
      </span>
      <span>Go back home</span>
    </nuxt-link>
  </div>
  <page-title class="mt-4"v-if="title">{{ title }}</page-title>
  <div class="mt-10">
    <ul v-if="store.errors.length" class="space-y-2">
      <li v-for="(err, i) in store.errors" :key="i">
        <base-alert @dismiss="store.errors.splice(i, 1)">{{ err }}</base-alert>
      </li>
    </ul>
    <div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Home } from "lucide-vue-next";
import { useAuthStore } from "~/store/auth";
const store = useAuthStore();
defineProps<{
  title?: string;
}>();

defineEmits(["remove-error"]);
</script>
