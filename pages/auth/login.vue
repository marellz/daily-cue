<template>
  <auth-form title="Login">
    <form @submit.prevent="login">
      <div class="mt-4 flex flex-col space-y-4">
        <form-input type="email" label="Email" v-model="user.email" required />
        <form-input
          type="password"
          label="Password"
          v-model="user.password"
          required
        />
        <base-button class="rounded-lg btn-primary" :loading="store.loading">
          <span>Login</span>
        </base-button>
      </div>
    </form>
    <hr class="mt-4" />
    <div class="mt-4 flex flex-col space-y-2">
      <nuxt-link to="/auth/register" class="font-medium"
        >Create a new account</nuxt-link
      >
      <nuxt-link to="/auth/forgot-password" class="font-medium hover:underline focus:outline-1 focus:outline-dashed focus:outline-slate-400 text-slate-500"
        >Recover password</nuxt-link
      >
    </div>
  </auth-form>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import type { LoginForm } from "~/types/users";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const store = useAuthStore();

const user = ref<LoginForm>({
  email: "",
  password: "",
});

const login = async () => {
  await store.login(user.value);
};
</script>
