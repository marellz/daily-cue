<template>
  <div>
    <page-title>Login</page-title>
    <div class="mt-10">
      <ul v-if="store.errors.length">
        <li v-for="err in store.errors">
          {{ err }}
        </li>
      </ul>
      <form @submit.prevent="login">
        <div class="mt-4 flex flex-col space-y-4">
          <form-input
            type="email"
            label="Email"
            v-model="user.email"
            required
          />
          <form-input
            type="password"
            label="Password"
            v-model="user.password"
            required
          />
          <button type="submit" class="btn">
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
definePageMeta({
  layout: "auth",
});
const store = useAuthStore();
const user = ref({
  email: "guy@test.com",
  password: "secret",
});
const router = useRouter()
const login = async () => {
  let attempt = await store.login(user.value);

  if(attempt){
    router.push('/tasks')
  }
};
</script>
