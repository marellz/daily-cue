<template>
 <header>
    <layout-container class="pt-10">
      <div class="flex items-center justify-center space-x-4">
        <ul class="flex border border-slate-400 rounded-full px-4 py-1">
          <li v-for="({ to, label }, index) in filteredLinks" :key="index">
            <nuxt-link :to class="nav-link"
              exact-active-class="!text-black">{{ label }}</nuxt-link>
          </li>
          <template v-if="!isAuthenticated">
            <li class="!ml-auto">
              <nuxt-link to="/auth/login" class="nav-link nav-link--static">
                <span>Login</span>
              </nuxt-link>
            </li>
            <li>
               <nuxt-link to="/auth/register" class="nav-link !text-sea-green bg-tea-green/50">
                <span>Create account</span>
              </nuxt-link>
            </li>
          </template>
          <auth-dropdown v-if="isAuthenticated && user" />
        </ul>
      </div>
    </layout-container>
  </header>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const auth = useAuthStore();
const links = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/tasks",
    label: "Tasks",
    requiresAuth: true,
  },
];
const isAuthenticated = computed(() => auth.isAuthenticated);
const user = computed(() => auth.user);
const filteredLinks = computed(()=>links.filter(l=>{
  return l.requiresAuth ? isAuthenticated.value : l
}))
</script>