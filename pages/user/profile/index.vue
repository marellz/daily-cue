<template>
  <div class="mt-10" v-if="form">
    <fieldset class="card">
      <legend class="px-2">
        <h1 class="text-lg font-medium">User information</h1>
      </legend>
      <form @submit.prevent="updateUser">
        <div class="space-y-4">
          <form-input v-model="form.name" label="Name" required></form-input>
          <form-input
            v-model="form.email"
            disabled
            label="Email"
            required
          ></form-input>
          <base-button type="submit">
            <UserCheck />
            <span>Update profile</span>
          </base-button>
        </div>
      </form>
    </fieldset>
  </div>
</template>
<script lang="ts" setup>
import { Edit, FileCheck2, UserCheck, UserPen } from "lucide-vue-next";
import { useAuthStore, type User } from "~/store/auth";
definePageMeta({
  middleware: "auth",
});

const auth = useAuthStore();

const form = ref<User | null>(null);

const updateUser = async () => {
  if (!form.value) {
    return;
  }

  await auth.updateUser(form.value);
};

onMounted(() => {
  if (auth.user) {
    form.value = auth.user;
  }
});
</script>
