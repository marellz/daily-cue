<template>
  <layout-container>
    <!-- header -->
    <div>
      <page-title>User profile</page-title>
    </div>

    <div class="py-10 flex">
      <nuxt-link
        :to="link.path"
        v-for="(link, index) in links"
        :key="index"
        class="border-b px-4 py-1.5 border-current text-slate-400"
        exact-active-class="!text-black"
      >
        {{ link.label }}
      </nuxt-link>
    </div>
    <router-view />
  </layout-container>
</template>
<script lang="ts" setup>
const links = [
  { path: "/user/profile/", label: "User info" },
  { path: "/user/profile/update-password", label: "Update password" },
];
</script>
