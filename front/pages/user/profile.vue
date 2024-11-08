<template>
  <layout-container>
    <div class="mx-auto max-w-2xl">
      <!-- header -->
      <div>
        <page-title>User profile</page-title>
      </div>
      <div class="mt-10">
        <fieldset class="card">
          <legend class="px-2">
            <h1 class="text-lg font-medium">User information</h1>
          </legend>
          <form @submit.prevent="updateUserInformation">
            <div class="space-y-4">
              <form-input
                v-model="form.name"
                label="Name"
                required
              ></form-input>
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
      <div class="mt-10">
        <fieldset class="card">
          <legend class="px-2">
            <h1 class="text-lg font-medium">Update password</h1>
          </legend>
          <form @submit.prevent="updatePassword">
            <div class="space-y-4">
              <form-input
                v-model="password.current"
                label="Current Password"
                required
              ></form-input>
              <form-input
                v-model="password.new_pass"
                label="New password"
                required
              ></form-input>
              <form-input
                v-model="password.new_pass_confirmation"
                label="Confirm new password"
                required
              ></form-input>
              <div class="flex space-x-2">
                <base-button>
                  <FileCheck2 />
                  <span>Change password</span>
                </base-button>

                <dev-only>
                  <button class="btn" type="button" @click="fillDummyPassword">
                    Fill dummy
                  </button>
                </dev-only>
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  </layout-container>
</template>
<script lang="ts" setup>
import { Edit, FileCheck2, UserCheck, UserPen } from "lucide-vue-next";
import { useAuthStore } from "~/store/auth";
import type { User } from "~/types/users";
import type { UserForm, PasswordForm } from "~/types/form";
definePageMeta({
  middleware: "auth",
});

const auth = useAuthStore();

const emptyUserForm: UserForm = {
  name: "",
  email: "",
};

const emptyPasswordForm: PasswordForm = {
  current: "",
  new_pass: "",
  new_pass_confirmation: "",
};

const form = ref<User | UserForm>(emptyUserForm);
const password = ref(emptyPasswordForm);

const updateUserInformation = async () => {
  await auth.updateUserInformation(form.value);
};

const updatePassword = async () => {
  const updated = await auth.updatePassword(password.value);
  if (updated) {
    password.value = emptyPasswordForm;
  }
};

const fillDummyPassword = () => {
  const current = "secret21";
  const new_pass = useFaker().generateString();

  password.value = {
    current,
    new_pass,
    new_pass_confirmation: new_pass,
  };
};

onMounted(() => {
  if (auth.user) {
    form.value = auth.user;
  }
});
</script>
