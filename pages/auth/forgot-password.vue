<template>
  <auth-form title="Forgot password">
    <form @submit.prevent="login">
      <div class="mt-4 flex flex-col space-y-4">
        <form-input type="email" label="Email" v-model="email" required />
        <base-button class="rounded-lg btn-primary" :loading="store.loading">
          <span>Login</span>
        </base-button>
      </div>
    </form>
    <hr class="mt-4" />
    <div class="mt-4 flex flex-col space-y-2">
      <nuxt-link to="/auth/login" class="font-medium"
        >Cancel</nuxt-link
      >
    </div>
  </auth-form>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const store = useAuthStore();

const email = ref('')

const login = async () => {
  await store.resetPassword(email.value);
};
</script>
