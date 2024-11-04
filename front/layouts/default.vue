<template>
  <toast-wrapper />
  <header class="border-b">
    <layout-container class="py-10">
      <div class="flex items-center space-x-10">
        <nuxt-link to="/">
          <base-logo />
        </nuxt-link>

        <ul class="flex space-x-4 flex-auto">
          <li v-for="({ to, label }, index) in links" :key="index">
            <nuxt-link :to class="font-medium">{{ label }}</nuxt-link>
          </li>
          <template v-if="!isAuthenticated">
            <li class="!ml-auto">
              <nuxt-link to="/auth/login" class="font-medium">
                <span>Login</span>
              </nuxt-link>
            </li>
            <li>
               <nuxt-link to="/auth/register" class="font-medium">
                <span>Create account</span>
              </nuxt-link>
            </li>
          </template>
        </ul>
        <auth-dropdown v-if="isAuthenticated && user" />
      </div>
    </layout-container>
  </header>
  <main class="flex-auto my-10">
    <slot />
  </main>
  <footer class="bg-gray-900 text-white py-4">
    <layout-container>
      <div class="flex items-center space-x-10">
        <base-logo />
        <p>
          Made by @<a
            class="text-blue-500"
            href="https://dave-njoroge.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            >Dave</a
          >
          with 🫀
        </p>
      </div>
    </layout-container>
  </footer>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';

const auth = useAuthStore()
const links = [
  {
    to: "/tasks",
    label: "Tasks",
  },
];
const isAuthenticated = computed(() => auth.isAuthenticated)
const user = computed(() => auth.user)

</script>
