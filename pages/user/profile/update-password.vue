<template>
  <div class="mt-10">
    <fieldset class="card">
      <legend class="px-2">
        <h1 class="text-lg font-medium">Update password</h1>
      </legend>
      <form @submit.prevent="updatePassword">
        <div class="space-y-4">
          <form-input
            v-model="form.old_password"
            label="Current Password"
            required
          ></form-input>
          <form-input
            v-model="form.password"
            label="New password"
            required
          ></form-input>
          <form-input
            v-model="form.confirm_password"
            label="Confirm new password"
            required
          ></form-input>
          <div class="flex space-x-2">
            <base-button>
              <FileCheck2 />
              <span>Change password</span>
            </base-button>
          </div>
        </div>
      </form>
    </fieldset>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const auth = useAuthStore();

const form = ref({
  old_password: "",
  password: "",
  confirm_password: "",
});

const updatePassword = async () => {
  const updated = await auth.updatePassword(form.value.password);
  if (updated) {
    form.value = {
      password: "",
      confirm_password: "",
      old_password: "",
    };
  }
};
</script>
