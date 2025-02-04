<template>
  <auth-form title="Register">
    <form @submit.prevent="register">
      <div class="mt-4 flex flex-col space-y-4">
        <form-input v-model="user.name" label="Name" required />
        <form-input type="email" v-model="user.email" label="Email" required />
        <form-input
          type="password"
          v-model="user.password"
          label="Password"
          required
        />
        <form-input
          type="password"
          v-model="user.password_confirmation"
          label="Confirm password"
          required
        />
        <base-button class="rounded-lg btn-primary":loading="store.loading">
          <span>Create account</span>
        </base-button>
      </div>
    </form>
    <hr class="mt-4" />
    <div class="mt-4 flex flex-col space-y-2">
      <nuxt-link to="/auth/login" class="font-medium"
        >Login to existing account</nuxt-link
      >
    </div>
  </auth-form>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

definePageMeta({
  layout: "auth",
  middleware: "guest"
});

const store = useAuthStore();

const user = ref<RegistrationForm>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});


const register = async () => {
  await store.register(user.value);
};

</script>
