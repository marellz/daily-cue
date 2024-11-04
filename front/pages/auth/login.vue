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
        <base-button :loading="store.loading">
          <span>Login</span>
        </base-button>
        <dev-only>
          <button type="button" @click="fillDefaultValues">Fill values</button>
        </dev-only>
      </div>
    </form>
    <hr class="mt-4" />
    <div class="mt-4 flex flex-col space-y-2">
      <nuxt-link to="/auth/register" class="font-medium"
        >Create a new account</nuxt-link
      >
      <nuxt-link to="#" class="font-medium text-slate-500"
        >Recover password</nuxt-link
      >
    </div>
  </auth-form>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import useFaker from "~/composables/useFaker";
import type { LoginForm } from "~/types/users";
import { useToastsStore } from "~/store/toasts";

definePageMeta({
  layout: "auth",
  middleware: "guest"
});

const store = useAuthStore();
const toasts = useToastsStore()
const router = useRouter();
const { getRandomUser } = useFaker();

const user = ref<LoginForm>({
  email: "",
  password: "",
});

const fillDefaultValues = async () => {
  let testUser = await getRandomUser();
  if(testUser){
    user.value = testUser
  } else {
    toasts.add({
      title:"Error gathering test users"
    })
  }
};

const login = async () => {
  store.clearErrors();
  let attempt = await store.login(user.value);

  if (attempt) {
    router.push("/tasks");
  }
};

onMounted(store.clearErrors);
</script>
